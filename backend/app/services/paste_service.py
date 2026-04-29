from fastapi import HTTPException

from app.repositories.paste_repository import PasteRepository

from app.schemas.paste_schema import PasteCreateSchema, PasteUpdateSchema
from datetime import datetime
from app.models.paste_model import PasteModel
from app.utils.expire import get_expire_at


class PasteService:
    def __init__(self, repo: PasteRepository):
        self.repo = repo

    async def create(self, user_id: int, paste: PasteCreateSchema) -> PasteModel:
        data = paste.model_dump()

        expires_at = get_expire_at(paste.time_to_delete)

        new_paste_dict = {
            **data,
            "user_id": user_id,
            "expires_at": expires_at,
        }
        print("DEBUG USER_ID:", user_id, type(user_id))
        print("DEBUG DATA:", new_paste_dict)
        return await self.repo.create(new_paste_dict)

    async def get_all_by_user(self, user_id: str):
        return await self.repo.get_all_by_user(user_id)

    async def update(self, paste_id: str, data: PasteUpdateSchema):
        paste = await self.repo.get_single(id=paste_id)

        if not paste:
            raise ValueError("Paste not found")

        update_data = data.model_dump(exclude_unset=True)

        if "time_to_delete" in update_data:
            update_data["expires_at"] = get_expire_at(
                update_data["time_to_delete"]
            )

        return await self.repo.update(paste, update_data)

    async def get_single(self, paste_id: str):
        paste = await self.repo.get_single(id=paste_id)

        if not paste:
            raise ValueError("Paste not found")

        if paste.expires_at < datetime.utcnow():
            raise HTTPException(
                status_code=404,
                detail="This paste has expired"
            )

        return {
            "id": paste.id,
            "title": paste.title,
            "text": paste.text,
            "time_to_delete": paste.time_to_delete,
            "expires_at": paste.expires_at,
            "is_expired": paste.expires_at < datetime.utcnow(),
        }

    async def get_all(self):
        pastes = await self.repo.get_all()

        return [
            {
                "id": p.id,
                "title": p.title,
                "text": p.text,
                "time_to_delete": p.time_to_delete,
                "expires_at": p.expires_at,
                "is_expired": p.expires_at < datetime.utcnow(),
            }
            for p in pastes
        ]

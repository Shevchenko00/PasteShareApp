from datetime import datetime
from typing import TypeVar, Optional
from sqlalchemy import delete, select, update
from sqlalchemy.ext.asyncio import AsyncSession
from .base_repository import AbstractRepository


class PasteRepository(AbstractRepository):
    def __init__(self, session: AsyncSession, model):
        self.session = session
        self.model = model

    async def get_all_by_user(self, user_id: int):
        query = select(self.model).where(self.model.user_id == user_id)
        result = await self.session.execute(query)
        pastes = result.scalars().all()

        return [
            {
                "id": paste.id,
                "title": paste.title,
                "text": paste.text,
                "time_to_delete": paste.time_to_delete,
                "expires_at": paste.expires_at,
                "is_expired": paste.expires_at < datetime.utcnow()
            }
            for paste in pastes
        ]


    async def create(self, data: dict):
        instance = self.model(**data)


        self.session.add(instance)
        await self.session.commit()
        await self.session.refresh(instance)

        return instance

    async def update(self, obj, data: dict):
        for key, value in data.items():
            setattr(obj, key, value)

        self.session.add(obj)
        await self.session.commit()
        await self.session.refresh(obj)

        return obj

    async def delete(self, **filters) -> None:
        await self.session.execute(delete(self.model).filter_by(**filters))
        await self.session.commit()

    async def get_single(self, **filters) -> Optional[TypeVar]:
        row = await self.session.execute(select(self.model).filter_by(**filters))
        return row.scalar_one_or_none()

    async def get_all(
            self, order: str = "id", limit: int = 100, offset: int = 0
    ) -> list[TypeVar]:
        query = select(self.model)

        row = await self.session.execute(query)
        return row.scalars().all()
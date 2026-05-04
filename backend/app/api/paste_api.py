from fastapi import APIRouter, Depends

from app.dependencies.user_dependencies import get_current_user
from app.services.paste_service import PasteService

from app.dependencies.paste_dependencies import get_paste_service

router = APIRouter()


from fastapi import APIRouter, Depends

from app.services.paste_service import PasteService
from app.schemas.paste_schema import PasteCreateSchema, PasteUpdateSchema

from app.dependencies.paste_dependencies import get_paste_service

router = APIRouter()


@router.post("/create")
async def create_file(
        data: PasteCreateSchema,
        service: PasteService = Depends(get_paste_service),
        current_user = Depends(get_current_user)

):
    return await service.create(current_user.id,data)


@router.get("/")
async def get_all_paste(
        service: PasteService = Depends(get_paste_service),
        current_user = Depends(get_current_user)
):
    return await service.get_all_by_user(current_user.id)

@router.patch("/{paste_id}")
async def update_paste(
        paste_id: str,
        data: PasteUpdateSchema,
        service: PasteService = Depends(get_paste_service),
        current_user = Depends(get_current_user)
):
    return await service.update(paste_id, current_user.id, data)

@router.get("/{paste_id}")
async def get_single_paste(
    paste_id: str,
    service: PasteService = Depends(get_paste_service)
):
    return await service.get_single(paste_id)
from fastapi import APIRouter, Depends

from app.services.paste_service import PasteService
from app.schemas.paste_schema import PasteCreateScheme

from app.dependencies.paste_dependencies import get_paste_service

router = APIRouter()


@router.post("/create")
async def create_file(data: PasteCreateScheme, service: PasteService = Depends(get_paste_service)):
    payload = data.model_dump()
    return await service.create(payload)



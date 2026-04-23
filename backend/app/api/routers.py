from app.api.paste_api import router as file_router
from fastapi import APIRouter
v1 = APIRouter()
v1.include_router(file_router, prefix='/paste', tags=["paste"])
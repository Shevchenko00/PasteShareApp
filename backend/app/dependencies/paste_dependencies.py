from typing import Annotated
from fastapi import Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.services.paste_service import PasteService
from app.core.database_config import get_session
def get_paste_service(session: AsyncSession = Depends(get_session)):
    return PasteService(session)
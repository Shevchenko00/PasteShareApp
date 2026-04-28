from typing import Annotated
from fastapi import Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database_config import get_session
from app.services.user_service import UsersService


def get_user_service(session: AsyncSession = Depends(get_session)):
    return UsersService(session)


from fastapi import Request

async def get_current_user(
    request: Request,
    user_service: UsersService = Depends(get_user_service)
):
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    payload = user_service.verify_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid access token")
    user = await user_service.get_by_email(payload["sub"])
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user
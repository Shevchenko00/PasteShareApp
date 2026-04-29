from pydantic import BaseModel, EmailStr
from app.utils.enums import TimeToDeleteEnum


class PasteCreateSchema(BaseModel):
    title: str
    text: str
    time_to_delete: TimeToDeleteEnum = TimeToDeleteEnum.ONE_HOUR


class PasteUpdateSchema(BaseModel):
    title: str | None = None
    text: str | None = None
    time_to_delete: TimeToDeleteEnum | None = None

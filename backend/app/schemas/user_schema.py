import re
from .base_schema import Base
from pydantic import field_validator, EmailStr

from fastapi import HTTPException, status
from pydantic import field_validator

LETTER_MATCH_PATTERN = re.compile(r"^[а-яА-Яa-zA-Z\-]+$")
USERNAME_LETTER_MATCH_PATTERN = re.compile(r"^[a-zA-Z]")
MAX_PASSWORD_LENGTH = 3


class UserCreationModel(Base):
    password: str
    email: EmailStr




    @field_validator("password")
    def validate_password(cls, value):
        if len(value) < MAX_PASSWORD_LENGTH:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=f"Password can not contain less than {MAX_PASSWORD_LENGTH} symbols",
            )
        return value


class UserAuthModel(Base):
    email: str
    password: str


class UserViewModel(Base):
    id: int
    email: str



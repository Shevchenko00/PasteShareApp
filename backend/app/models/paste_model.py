from sqlalchemy import Enum as SqlEnum
from app.utils.enums import TimeToDeleteEnum
from .base_model import Base
from sqlalchemy.orm import Mapped, mapped_column
from typing import Optional
from datetime import datetime

from ..utils.short_hash import generate_short_id


class PasteModel(Base):
    __tablename__ = "paste"


    id: Mapped[str] = mapped_column(
        primary_key=True,
        default=generate_short_id
    )

    title: Mapped[Optional[str]] = mapped_column(nullable=True)
    text: Mapped[Optional[str]] = mapped_column(nullable=True)
    expires_at: Mapped[datetime] = mapped_column(nullable=False)
    user_id: Mapped[int] = mapped_column(nullable=False)
    time_to_delete: Mapped[TimeToDeleteEnum] = mapped_column(
        SqlEnum(TimeToDeleteEnum, name="time_to_delete_enum"),
        nullable=False,
    )
from sqlalchemy.orm import Mapped, mapped_column
from app.models.base_model import Base


class UsersModel(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(unique=True, index=True)
    password: Mapped[str] = mapped_column()

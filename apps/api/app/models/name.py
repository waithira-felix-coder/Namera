from sqlalchemy import String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class Name(Base):
    __tablename__ = "names"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    slug: Mapped[str] = mapped_column(String(120), unique=True, index=True, nullable=False)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    gender: Mapped[str] = mapped_column(String(20), nullable=False)
    meaning: Mapped[str] = mapped_column(String(255), nullable=False)
    origin: Mapped[str] = mapped_column(String(120), nullable=False)
    language: Mapped[str] = mapped_column(String(120), nullable=False)
    popularity: Mapped[str] = mapped_column(String(80), nullable=False)
    style: Mapped[str] = mapped_column(String(80), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    pronunciation: Mapped[str] = mapped_column(String(200), nullable=False)
    compatibility: Mapped[str] = mapped_column(String(120), nullable=False)
    profile: Mapped[str] = mapped_column(String(180), nullable=False, default="balanced")
    discoverability: Mapped[str] = mapped_column(String(80), nullable=False, default="moderate")
    vibe: Mapped[str] = mapped_column(String(100), nullable=False, default="classic")
    nickname: Mapped[str] = mapped_column(String(120), nullable=False, default="")
    tags: Mapped[str] = mapped_column(Text, nullable=False, default="")

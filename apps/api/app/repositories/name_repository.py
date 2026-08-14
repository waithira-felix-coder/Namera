from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.name import Name


class NameRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def list_names(self) -> list[Name]:
        return self.db.execute(select(Name)).scalars().all()

    def get_by_slug(self, slug: str) -> Name | None:
        return self.db.execute(select(Name).where(Name.slug == slug)).scalar_one_or_none()

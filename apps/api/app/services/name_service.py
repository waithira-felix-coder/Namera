from app.models.name import Name
from app.repositories.name_repository import NameRepository


class NameService:
    def __init__(self, repository: NameRepository) -> None:
        self.repository = repository

    def list_names(self) -> list[Name]:
        return self.repository.list_names()

    def get_by_slug(self, slug: str) -> Name | None:
        return self.repository.get_by_slug(slug)

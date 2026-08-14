from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import SessionLocal
from app.repositories.name_repository import NameRepository
from app.schemas.name import NameRead
from app.services.name_service import NameService

router = APIRouter(prefix="/api/v1", tags=["names"])


def get_db() -> Session:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/names", response_model=list[NameRead])
def list_names(db: Session = Depends(get_db)) -> list[NameRead]:
    service = NameService(NameRepository(db))
    return service.list_names()


@router.get("/names/{slug}", response_model=NameRead)
def get_name(slug: str, db: Session = Depends(get_db)) -> NameRead:
    service = NameService(NameRepository(db))
    name = service.get_by_slug(slug)
    if name is None:
        raise ValueError("Name not found")
    return name

from pydantic import BaseModel, ConfigDict


class NameBase(BaseModel):
    slug: str
    name: str
    gender: str
    meaning: str
    origin: str
    language: str
    popularity: str
    style: str
    description: str
    pronunciation: str
    compatibility: str
    profile: str = "balanced"
    discoverability: str = "moderate"
    vibe: str = "classic"
    nickname: str = ""
    tags: str = ""


class NameRead(NameBase):
    id: int
    model_config = ConfigDict(from_attributes=True)

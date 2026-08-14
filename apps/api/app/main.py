from fastapi import FastAPI

from app.api.v1.router import api_router
from app.core.config import get_settings

settings = get_settings()

app = FastAPI(
    title=settings.app_name,
    version="0.1.0",
    description="Namera API for names, search, comparisons, and recommendation support.",
)

app.include_router(api_router)


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok", "app": settings.app_name, "environment": settings.app_env}


@app.get("/api/v1")
def api_root() -> dict[str, str]:
    return {"message": "Welcome to Namera API", "version": "v1"}

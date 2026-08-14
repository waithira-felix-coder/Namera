from fastapi import APIRouter

from app.api.v1.routes.names import router as names_router

api_router = APIRouter()
api_router.include_router(names_router)

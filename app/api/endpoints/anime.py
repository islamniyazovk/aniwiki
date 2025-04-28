from fastapi import APIRouter
from app.utils.external_api import AnimeAPI

anime_router = APIRouter(
    prefix="/anime",
    tags=["anime"]
)

@anime_router.get("/")
async def get_animes(title: str | None = None, page: int | None = None):
    anime = await AnimeAPI().get_animes(anime_title=title, page=page)
    return anime

@anime_router.get("/{anime_id}")
async def get_anime(anime_id: int):
    anime = await AnimeAPI().get_anime(anime_id)
    return anime
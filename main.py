from fastapi import FastAPI
from app.api.endpoints.anime import  anime_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.include_router(anime_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Разрешить всё, или можешь указать например ["http://localhost:5500"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

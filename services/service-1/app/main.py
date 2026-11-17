from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.courts import router as courts_router
from app.api.health import router as health_router
from app.models import Court, Schedule  # noqa: F401

app = FastAPI(title="Courts Service", version="0.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(health_router)
app.include_router(courts_router)

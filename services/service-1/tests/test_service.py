from datetime import date

from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.pool import StaticPool

from app.api.health import health
from app.db.base import Base
from app.main import app
from app.schemas.court import CourtCreate, ScheduleCreate
from app.services.court_service import create_court, create_schedule, list_courts, list_schedules

engine = create_engine("sqlite://", connect_args={"check_same_thread": False}, poolclass=StaticPool)
Base.metadata.create_all(engine)


def test_service_starts_and_exposes_health_route() -> None:
    assert app.title == "Courts Service"
    assert health() == {"status": "ok"}


def test_court_and_schedule_persist_in_service_database() -> None:
    with Session(engine) as db:
        court = create_court(
            db, CourtCreate(name="Central", location="Tingo Maria", sport="futbol")
        )
        schedule = create_schedule(
            db,
            court.id,
            ScheduleCreate(day=date(2026, 12, 1), start_time="18:00", end_time="19:00"),
        )
        assert [item.id for item in list_courts(db)] == [court.id]
        assert [item.id for item in list_schedules(db, court.id)] == [schedule.id]


def test_api_contract_contains_required_routes() -> None:
    assert set(app.openapi()["paths"]) == {
        "/health",
        "/courts",
        "/courts/{court_id}/schedules",
        "/courts/{court_id}/schedules/{schedule_id}",
    }

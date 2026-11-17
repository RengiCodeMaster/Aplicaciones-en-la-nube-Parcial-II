from collections.abc import Sequence

from sqlalchemy.orm import Session

from app.models.court import Court
from app.models.schedule import Schedule
from app.repositories import court_repository
from app.schemas.court import CourtCreate, ScheduleCreate


class CourtNotFoundError(Exception):
    pass


def create_court(db: Session, data: CourtCreate) -> Court:
    return court_repository.create_court(db, Court(**data.model_dump()))


def list_courts(db: Session) -> Sequence[Court]:
    return court_repository.list_courts(db)


def create_schedule(db: Session, court_id: int, data: ScheduleCreate) -> Schedule:
    if court_repository.get_court(db, court_id) is None:
        raise CourtNotFoundError("Cancha no encontrada")
    schedule = Schedule(court_id=court_id, **data.model_dump())
    return court_repository.create_schedule(db, schedule)


def list_schedules(db: Session, court_id: int) -> Sequence[Schedule]:
    if court_repository.get_court(db, court_id) is None:
        raise CourtNotFoundError("Cancha no encontrada")
    return court_repository.list_schedules(db, court_id)


def get_schedule(db: Session, court_id: int, schedule_id: int) -> Schedule:
    schedule = court_repository.get_schedule(db, court_id, schedule_id)
    if schedule is None:
        raise CourtNotFoundError("Horario no encontrado")
    return schedule

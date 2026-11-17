from collections.abc import Sequence

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.court import Court
from app.models.schedule import Schedule


def create_court(db: Session, court: Court) -> Court:
    db.add(court)
    db.commit()
    db.refresh(court)
    return court


def list_courts(db: Session) -> Sequence[Court]:
    return db.scalars(select(Court).order_by(Court.name)).all()


def get_court(db: Session, court_id: int) -> Court | None:
    return db.get(Court, court_id)


def create_schedule(db: Session, schedule: Schedule) -> Schedule:
    db.add(schedule)
    db.commit()
    db.refresh(schedule)
    return schedule


def list_schedules(db: Session, court_id: int) -> Sequence[Schedule]:
    statement = (
        select(Schedule)
        .where(Schedule.court_id == court_id, Schedule.is_available.is_(True))
        .order_by(Schedule.day, Schedule.start_time)
    )
    return db.scalars(statement).all()


def get_schedule(db: Session, court_id: int, schedule_id: int) -> Schedule | None:
    statement = select(Schedule).where(
        Schedule.id == schedule_id,
        Schedule.court_id == court_id,
        Schedule.is_available.is_(True),
    )
    return db.scalar(statement)

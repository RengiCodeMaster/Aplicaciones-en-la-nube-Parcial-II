from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.court import CourtCreate, CourtResponse, ScheduleCreate, ScheduleResponse
from app.services.court_service import (
    CourtNotFoundError,
    create_court,
    create_schedule,
    get_schedule,
    list_courts,
    list_schedules,
)

router = APIRouter(prefix="/courts", tags=["courts"])


@router.get("", response_model=list[CourtResponse])
def get_courts(db: Session = Depends(get_db)) -> list[CourtResponse]:
    return [CourtResponse.model_validate(court) for court in list_courts(db)]


@router.post("", response_model=CourtResponse, status_code=status.HTTP_201_CREATED)
def post_court(data: CourtCreate, db: Session = Depends(get_db)) -> CourtResponse:
    return CourtResponse.model_validate(create_court(db, data))


@router.get("/{court_id}/schedules", response_model=list[ScheduleResponse])
def get_schedules(court_id: int, db: Session = Depends(get_db)) -> list[ScheduleResponse]:
    try:
        schedules = list_schedules(db, court_id)
    except CourtNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    return [ScheduleResponse.model_validate(schedule) for schedule in schedules]


@router.post("/{court_id}/schedules", response_model=ScheduleResponse, status_code=201)
def post_schedule(
    court_id: int,
    data: ScheduleCreate,
    db: Session = Depends(get_db),
) -> ScheduleResponse:
    try:
        schedule = create_schedule(db, court_id, data)
    except CourtNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    return ScheduleResponse.model_validate(schedule)


@router.get("/{court_id}/schedules/{schedule_id}", response_model=ScheduleResponse)
def get_schedule_by_id(
    court_id: int,
    schedule_id: int,
    db: Session = Depends(get_db),
) -> ScheduleResponse:
    try:
        schedule = get_schedule(db, court_id, schedule_id)
    except CourtNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    return ScheduleResponse.model_validate(schedule)

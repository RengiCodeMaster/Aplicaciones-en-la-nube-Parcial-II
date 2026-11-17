from datetime import date, time

from pydantic import BaseModel, ConfigDict, Field, model_validator


class CourtCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    location: str = Field(min_length=2, max_length=255)
    sport: str = Field(min_length=2, max_length=80)


class CourtResponse(CourtCreate):
    model_config = ConfigDict(from_attributes=True)

    id: int


class ScheduleCreate(BaseModel):
    day: date
    start_time: time
    end_time: time

    @model_validator(mode="after")
    def validate_times(self) -> "ScheduleCreate":
        if self.start_time >= self.end_time:
            raise ValueError("La hora de inicio debe ser anterior a la hora de fin")
        return self


class ScheduleResponse(ScheduleCreate):
    model_config = ConfigDict(from_attributes=True)

    id: int
    court_id: int
    is_available: bool

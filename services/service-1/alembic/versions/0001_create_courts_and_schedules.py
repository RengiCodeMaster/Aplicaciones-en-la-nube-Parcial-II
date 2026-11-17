"""create courts and schedules

Revision ID: 0001_create_courts_and_schedules
Revises:
"""

import sqlalchemy as sa

from alembic import op

revision = "0001_create_courts_and_schedules"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "courts",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("name", sa.String(length=120), nullable=False),
        sa.Column("location", sa.String(length=255), nullable=False),
        sa.Column("sport", sa.String(length=80), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )
    op.create_table(
        "schedules",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("court_id", sa.Integer(), sa.ForeignKey("courts.id"), nullable=False),
        sa.Column("day", sa.Date(), nullable=False),
        sa.Column("start_time", sa.Time(), nullable=False),
        sa.Column("end_time", sa.Time(), nullable=False),
        sa.Column("is_available", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )
    op.create_index("ix_schedules_court_id", "schedules", ["court_id"])


def downgrade() -> None:
    op.drop_index("ix_schedules_court_id", table_name="schedules")
    op.drop_table("schedules")
    op.drop_table("courts")

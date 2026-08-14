"""initial_names_table

Revision ID: 712051edcf98
Revises: 
Create Date: 2026-08-14 16:01:38.748907

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '712051edcf98'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table(
        'names',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('slug', sa.String(length=120), nullable=False),
        sa.Column('name', sa.String(length=120), nullable=False),
        sa.Column('gender', sa.String(length=20), nullable=False),
        sa.Column('meaning', sa.String(length=255), nullable=False),
        sa.Column('origin', sa.String(length=120), nullable=False),
        sa.Column('language', sa.String(length=120), nullable=False),
        sa.Column('popularity', sa.String(length=80), nullable=False),
        sa.Column('style', sa.String(length=80), nullable=False),
        sa.Column('description', sa.Text(), nullable=False),
        sa.Column('pronunciation', sa.String(length=200), nullable=False),
        sa.Column('compatibility', sa.String(length=120), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_names_id'), 'names', ['id'], unique=False)
    op.create_index(op.f('ix_names_slug'), 'names', ['slug'], unique=True)


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_index(op.f('ix_names_slug'), table_name='names')
    op.drop_index(op.f('ix_names_id'), table_name='names')
    op.drop_table('names')

"""empty message

Revision ID: 23264e718db5
Revises: fb379c1b450c
Create Date: 2024-07-22 10:13:50.284570

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '23264e718db5'
down_revision = 'fb379c1b450c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('planets',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('diameter', sa.Integer(), nullable=False),
    sa.Column('climate', sa.String(length=80), nullable=False),
    sa.Column('terrain', sa.String(length=120), nullable=False),
    sa.Column('population', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('starships',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.Column('model', sa.String(length=120), nullable=False),
    sa.Column('manufacturer', sa.String(length=120), nullable=False),
    sa.Column('passengers', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('model'),
    sa.UniqueConstraint('name')
    )
    op.create_table('people',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('birth_year', sa.String(length=20), nullable=False),
    sa.Column('species', sa.String(length=80), nullable=False),
    sa.Column('height', sa.Integer(), nullable=False),
    sa.Column('mass', sa.Integer(), nullable=False),
    sa.Column('gender', sa.String(length=80), nullable=True),
    sa.Column('hair_color', sa.String(length=80), nullable=True),
    sa.Column('skin_color', sa.String(length=80), nullable=True),
    sa.Column('planet_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['planet_id'], ['planets.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('favorites',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('people_id', sa.Integer(), nullable=True),
    sa.Column('planet_id', sa.Integer(), nullable=True),
    sa.Column('starship_id_', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['people_id'], ['people.id'], ),
    sa.ForeignKeyConstraint(['planet_id'], ['planets.id'], ),
    sa.ForeignKeyConstraint(['starship_id_'], ['starships.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('people_starships_rel',
    sa.Column('people_id', sa.Integer(), nullable=False),
    sa.Column('starship_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['people_id'], ['people.id'], ),
    sa.ForeignKeyConstraint(['starship_id'], ['starships.id'], ),
    sa.PrimaryKeyConstraint('people_id', 'starship_id')
    )
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('first_name', sa.String(length=50), nullable=False))
        batch_op.add_column(sa.Column('last_name', sa.String(length=100), nullable=False))
        batch_op.add_column(sa.Column('creation_date', sa.Date(), nullable=False))
        batch_op.drop_column('is_active')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('is_active', sa.BOOLEAN(), autoincrement=False, nullable=False))
        batch_op.drop_column('creation_date')
        batch_op.drop_column('last_name')
        batch_op.drop_column('first_name')

    op.drop_table('people_starships_rel')
    op.drop_table('favorites')
    op.drop_table('people')
    op.drop_table('starships')
    op.drop_table('planets')
    # ### end Alembic commands ###
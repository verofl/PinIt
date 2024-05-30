from app.models import db, pinsboards, environment, SCHEMA
from sqlalchemy.sql import text


def seed_pinsboards():
    pinsboards_data = [
        {'pin_id': 1, 'board_id': 3},
        {'pin_id': 1, 'board_id': 6},
        {'pin_id': 2, 'board_id': 3},
        {'pin_id': 2, 'board_id': 6},
        {'pin_id': 3, 'board_id': 3},
        {'pin_id': 3, 'board_id': 6},
        {'pin_id': 4, 'board_id': 3},
        {'pin_id': 4, 'board_id': 6},
        {'pin_id': 5, 'board_id': 3},
        {'pin_id': 5, 'board_id': 6},
        {'pin_id': 6, 'board_id': 3},
        {'pin_id': 6, 'board_id': 6},
        {'pin_id': 7, 'board_id': 1},
        {'pin_id': 7, 'board_id': 10},
        {'pin_id': 8, 'board_id': 1},
        {'pin_id': 8, 'board_id': 10},
        {'pin_id': 9, 'board_id': 1},
        {'pin_id': 9, 'board_id': 10},
        {'pin_id': 10, 'board_id': 5},
        {'pin_id': 10, 'board_id': 8},
        {'pin_id': 11, 'board_id': 5},
        {'pin_id': 11, 'board_id': 8},
        {'pin_id': 12, 'board_id': 5},
        {'pin_id': 12, 'board_id': 8},
        {'pin_id': 13, 'board_id': 7},
        {'pin_id': 13, 'board_id': 2},
        {'pin_id': 14, 'board_id': 7},
        {'pin_id': 14, 'board_id': 2},
        {'pin_id': 15, 'board_id': 7},
        {'pin_id': 15, 'board_id': 2},
        {'pin_id': 16, 'board_id': 9},
        {'pin_id': 16, 'board_id': 4},
        {'pin_id': 17, 'board_id': 9},
        {'pin_id': 17, 'board_id': 4},
        {'pin_id': 18, 'board_id': 9},
        {'pin_id': 18, 'board_id': 4},
    ]


    db.session.execute(pinsboards.insert(), pinsboards_data)
    db.session.commit()

def undo_pinsboards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pinsboards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pinsboards"))

    db.session.commit()

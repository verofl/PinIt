from .db import db

pinsboards = db.Table(
    'pinsboards',

    db.Column('pin_id', db.Integer, db.ForeignKey("pins.id"), primary_key=True),
    db.Column('board_id', db.Integer, db.ForeignKey("boards.id"), primary_key=True)
)

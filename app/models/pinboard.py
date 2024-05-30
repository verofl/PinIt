from .db import db, environment, SCHEMA, add_prefix_for_prod


pinsboards = db.Table(
    'pinsboards',

    db.Column('pin_id', db.Integer, db.ForeignKey(add_prefix_for_prod("pins.id")), primary_key=True),
    db.Column('board_id', db.Integer, db.ForeignKey(add_prefix_for_prod("boards.id")), primary_key=True)
)

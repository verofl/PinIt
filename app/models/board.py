from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .pinboard import pinsboards


class Board(db.Model):
    __tablename__ = "boards"

    if environment == "production":
        __table_args__ = {"schema":SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,  db.ForeignKey(add_prefix_for_prod('users.id')),nullable=False)
    title = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    # Relationships
    users = db.relationship("User", back_populates='boards', cascade='all, delete-orphan')
    pins = db.relationship(
        "Pin",
        secondary=pinsboards,
        back_populates="boards", cascade='all, delete-orphan'
    )


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

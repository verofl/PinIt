from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
class Favorite(db.Model):
    __tablename__ = "favorites"

    if environment == "production":
        __table_args__ = {"schema":SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    pin_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('pins.id')), nullable=False)
    user_id = db.Column(db.Integer,  db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    # Relationships
    users = db.relationship("User", back_populates='favorites', cascade='all, delete-orphan')
    pins = db.relationship("Pin", back_populates='favorites', cascade='all, delete-orphan')


    def to_dict(self):
        return {
            'id': self.id,
            'pin_id': self.pin_id,
            'user_id': self.user_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from .pinboard import pinsboards

class Pin(db.Model):
    __tablename__ = "pins"

    if environment == "production":
        __table_args__ = {"schema":SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(55))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)


    # Relationship
    users = db.relationship("User", back_populates='pins')
    favorites = db.relationship("Favorite", back_populates='pins', cascade='all, delete-orphan')
    comments = db.relationship("Comment", back_populates='pins', cascade='all, delete-orphan')
    boards = db.relationship(
        "Board",
        secondary=pinsboards,
        back_populates="pins"
    )


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'image_url': self.image_url,
            'title': self.title,
            'description': self.description,
            'category': self.category,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'comments': [comment.to_dict() for comment in self.comments]
        }

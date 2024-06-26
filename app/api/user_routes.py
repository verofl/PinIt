from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Pin

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

@user_routes.route('/list')
# @login_required
def usersList():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

# Get Pins Created By User X
@user_routes.route("/<int:id>/created")
# @login_required
def user_pins(id):
  created_pins = Pin.query.filter_by(user_id = id).all()

  return jsonify([pins.to_dict() for pins in created_pins]), 200

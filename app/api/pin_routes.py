from flask import Blueprint, jsonify, json, request, redirect, render_template
from app.models import db, Pin, Comment, User
from flask_login import login_required, current_user
from app.forms.pin_form import PinForm, EditPinForm
from app.forms.comment_form import CommentForm, EditCommentForm
from app.api.aws import (
    upload_file_to_s3, get_unique_filename)



pin_routes = Blueprint('pins', __name__)

# Get ALL Pins X
@pin_routes.route("/")
def all_pins():
    fetched_pins = Pin.query.all()
    pins_data = []

    for pin in fetched_pins:
        pin_dict = pin.to_dict()

        users = User.query.filter(User.id == pin.user_id).all()
        users_data = [user.to_dict() for user in users]


        pin_dict['user'] = users_data
        pins_data.append(pin_dict)

    return jsonify(pins_data), 200



# Get INDIVIDUAL Pin X
  # Can also access Pin's comments here

@pin_routes.route("/<int:pin_id>")
def indv_pins(pin_id):
  indvPin = Pin.query.get(pin_id)

  if not indvPin:
    return {"message": "Pin couldn't be found"}, 404

  return indvPin.to_dict(), 200


# Create a Pin
@pin_routes.route("/new", methods=["POST"])
@login_required
def create_pin():
    form = PinForm()

    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():

        image = form.data["image_url"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        print(upload)

        if "url" not in upload:
          # if the dictionary doesn't have a url key
          # it means that there was an error when you tried to upload
          # so you send back that error message (and you printed it above)
          return render_template("pin_form.html", form=form, errors=[upload])

        url = upload["url"]

        new_pin = Pin(
            user_id=current_user.id,
            image_url=url,
            title=form.data["title"],
            description=form.data["description"],
            category=form.data["category"]
        )

        db.session.add(new_pin)
        db.session.commit()

        return new_pin.to_dict(), 201

    return form.errors, 400


# Update Pin
@pin_routes.route("/<int:pin_id>", methods=["PUT"])
@login_required
def update_pin(pin_id):
    form = EditPinForm()

    indvPin = Pin.query.get(pin_id)

    if not indvPin:
        return {"message": "Pin couldn't be found"}, 404

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        if 'image_url' in request.files:
            image = request.files['image_url']
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            print(upload)

            if "url" not in upload:
              # if the dictionary doesn't have a url key
              # it means that there was an error when you tried to upload
              # so you send back that error message (and you printed it above)
              return render_template("pin_form.html", form=form, errors=[upload])

            url = upload['url']
            indvPin.image_url = url
        else:
            url = None

        indvPin.title = form.data["title"]
        indvPin.description = form.data["description"]
        indvPin.category = form.data["category"]

        db.session.commit()

        return indvPin.to_dict(), 200

    return form.errors, 400

# Delete Pin
@pin_routes.route("/<int:pin_id>", methods=["DELETE"])
@login_required
def delete_pin(pin_id):
  indvPin = Pin.query.get(pin_id)

  if not indvPin:
    return {"message": "Pin couldn't be found"}, 404

  db.session.delete(indvPin)
  db.session.commit()
  return json.dumps({"message": "Succesfully deleted your pin"}), 202


# Create a Comment for an Individual Pin
@pin_routes.route("/<int:pin_id>/comments/new", methods=["POST"])
@login_required
def new_comment(pin_id):
  form = CommentForm()

  form["csrf_token"].data = request.cookies["csrf_token"]

  if form.validate_on_submit():
    new_comment = Comment(
      user_id=current_user.id,
      pin_id = pin_id,
      comment = form.data["comment"]
    )

    db.session.add(new_comment)
    db.session.commit()
  return new_comment.to_dict()

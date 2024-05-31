from flask import Blueprint, jsonify, json, request, redirect, render_template
from app.models import db, Comment
from flask_login import login_required, current_user
from app.forms.comment_form import EditCommentForm


comment_routes = Blueprint('comments', __name__)


# Update a Comment
@comment_routes.route("/<int:comment_id>", methods=["PUT"])
@login_required
def update_comment(comment_id):
  form = EditCommentForm()

  indvComment = Comment.query.get(comment_id)

  if not indvComment:
    return {"message": "Comment couldn't be found"}, 404

  form["csrf_token"].data = request.cookies["csrf_token"]

  if form.validate_on_submit():
      indvComment.comment = form.data["comment"]

      db.session.commit()
  return indvComment.to_dict(), 200


# Delete a Comment
@comment_routes.route("/<int:comment_id>", methods=["DELETE"])
@login_required
def delete_comment(comment_id):
    indvComment = Comment.query.get(comment_id)

    if not indvComment:
      return {"message": "Comment couldn't be found"}, 404
    else:
      db.session.delete(indvComment)
      db.session.commit()

      return json.dumps({"message": "Succesfully deleted your comment"}), 202

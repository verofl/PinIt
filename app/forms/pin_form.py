from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.aws import ALLOWED_EXTENSIONS
from wtforms.validators import DataRequired, Optional


class PinForm(FlaskForm):
    image_url = FileField("Pin Image", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    title= StringField("Title", validators=[DataRequired()])
    description = StringField("Description", validators=[DataRequired()])
    category = StringField("Category", validators=[DataRequired()])

class EditPinForm(FlaskForm):
    image_url = FileField("Pin Image", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    title= StringField("Title", validators=[DataRequired()])
    description = StringField("Description", validators=[DataRequired()])
    category = StringField("Category", validators=[DataRequired()])

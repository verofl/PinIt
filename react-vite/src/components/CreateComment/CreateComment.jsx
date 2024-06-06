import "./CreateComment.css";
import { postNewCommentThunk } from "../../redux/comment";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadPinsThunk } from "../../redux/pin";
import { CiLocationArrow1 } from "react-icons/ci";

export const CreateComment = () => {
  const dispatch = useDispatch();

  let { pin_id } = useParams();
  const pins = useSelector((state) => state.pinReducer);
  const pinId = Number(pin_id);
  const indvPin = pins[pinId];

  const user = useSelector((store) => store.session.user);

  const [comment, setComment] = useState("");

  const [validationErrors, setValidationErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const errors = {};

    if (comment.length > 255) {
      errors.comment = "Comment must be less than 255 characters.";
    }

    setValidationErrors(errors);
  }, [comment]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("comment", comment);

    try {
      await dispatch(postNewCommentThunk(pinId, formData));
      setComment("");
      setHasSubmitted(true);
      await dispatch(loadPinsThunk());
    } catch (error) {
      console.error("There was an error creating a new comment", error);
    }
  };

  const isSubmitDisabled = Object.values(validationErrors).length > 0;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="comment-pic-cont">
          <img
            src={user.profile_picture}
            alt={user.first_name}
            className="comment-user-pic"
          />
          <div className="create-cont">
            <input
              type="text"
              value={comment}
              placeholder="Add a comment"
              onChange={(e) => setComment(e.target.value)}
              className="comment-input"
            />
            <div className="form-errors error-layout">
              {validationErrors.comment}
            </div>

            <button
              type="submit"
              className="comment-submit-bttn"
              disabled={isSubmitDisabled}
            >
              <CiLocationArrow1 className="comment-arrow" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateComment;

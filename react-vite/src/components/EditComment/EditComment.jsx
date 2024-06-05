import "./EditComment.css";
import { updateCommentThunk } from "../../redux/comment";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadPinsThunk } from "../../redux/pin";

export const EditComment = ({ comment_id }) => {
  const dispatch = useDispatch();

  let { pin_id } = useParams();
  const pins = useSelector((state) => state.pinReducer);
  const pinId = Number(pin_id);
  const indvPin = pins[pinId];
  // console.log("COMMENT HERE TO EDIT ==>", pinId.comments[comment_id]);

  const user = useSelector((store) => store.session.user);
  let commentsArray = Object.values(indvPin?.comments || {});
  console.log("Edit COMMENTSARRAY HERE ===>", commentsArray);
  console.log("COMMENT ID ==>", comment_id);
  const commentToFind = commentsArray.find(
    (comment) => comment.id === comment_id
  );
  console.log("COMMENT TO FIND ==>", commentToFind);

  const [comment, setComment] = useState(commentToFind.comment || "");

  const [validationErrors, setValidationErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const errors = {};

    if (comment.length < 2 || comment.length > 255) {
      errors.review = "Comment must be between 2 and 255 characters.";
    }

    setValidationErrors(errors);
  }, [comment]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("comment", comment);

    try {
      await dispatch(updateCommentThunk(comment_id, formData));
      setComment("");
      setHasSubmitted(true);
      await dispatch(loadPinsThunk());
    } catch (error) {
      console.error("There was an error creating a new comment", error);
    }
  };

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
            ></input>
            <div className="form-errors">{validationErrors.comment}</div>

            <button type="submit" className="comment-submit-bttn">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditComment;

import "./CreateComment.css";
import { postNewCommentThunk } from "../../redux/comment";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadPinsThunk } from "../../redux/pin";

export const CreateComment = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  let { pin_id } = useParams();
  const pinId = Number(pin_id);
  console.log("PIN ID ==>", pinId);

  const [comment, setComment] = useState("");

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
      await dispatch(postNewCommentThunk(pinId, formData));
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
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></input>
        <div className="form-errors">{validationErrors.comment}</div>

        <button type="submit" className="form-submit-bttn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateComment;

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadPinsThunk } from "../../redux/pin";
import CreateComment from "../CreateComment/CreateComment";
import { loadUsersThunk } from "../../redux/user";
import OpenModalButton from "../../components/OpenModalButton";
import "./Comments.css";
import DeleteComment from "../DeleteComment/DeleteComment";

export const CommentDetails = () => {
  const dispatch = useDispatch();
  const { pin_id } = useParams();

  const pins = useSelector((state) => state.pinReducer);
  const users = useSelector((state) => state.userReducer);
  let usersArray = Object.values(users);

  const currentUser = useSelector((store) => store.session.user);

  const [loading, setLoading] = useState(true);

  const pinId = Number(pin_id);
  const indvPin = pins[pinId];

  let commentsArray = Object.values(indvPin?.comments || {});

  if (commentsArray.length > 0) {
    commentsArray.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(loadUsersThunk());
      await dispatch(loadPinsThunk());
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!indvPin) {
    return <p>Pin not found</p>;
  }

  return (
    <div>
      <h3 className="comment-header">Comments</h3>
      {commentsArray.length > 0 ? (
        <div className="comment-list">
          {commentsArray.map((comment) => (
            <div key={comment.id} className="each-comment">
              <div>{comment.comment}</div>
              {currentUser && comment.user_id === currentUser.id && (
                <DeleteComment comment_id={comment.id} />
              )}
            </div>
          ))}
        </div>
      ) : currentUser ? (
        <p>No comments yet! Add one to start the conversation!</p>
      ) : (
        <p>No comments yet! Log in to start the conversation!</p>
      )}
      {currentUser && <CreateComment />}
    </div>
  );
};

export default CommentDetails;

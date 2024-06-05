import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadPinsThunk } from "../../redux/pin";
import CreateComment from "../CreateComment/CreateComment";

export const CommentDetails = () => {
  const dispatch = useDispatch();
  const { pin_id } = useParams();
  const pins = useSelector((state) => state.pinReducer);
  const [loading, setLoading] = useState(true);

  const pinId = Number(pin_id);
  const indvPin = pins[pinId];

  let commentsArray = Object.values(indvPin?.comments || {});
  console.log("COMMENTS ARRAY ===>", commentsArray);

  useEffect(() => {
    const fetchData = async () => {
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
      <h3>Comments</h3>
      {commentsArray.length > 0 ? (
        commentsArray.map((comment) => (
          <div key={comment.id}>
            <div>{comment.comment}</div>
          </div>
        ))
      ) : (
        <p>No comments yet! Add one to start the conversation!</p>
      )}
      <CreateComment />
    </div>
  );
};

export default CommentDetails;

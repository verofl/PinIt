import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPinsThunk } from "../../redux/pin";
import { useParams } from "react-router-dom";
import DisplayFeed from "../DisplayFeed/DisplayFeed";
import "./PinDetails.css";
import CommentDetails from "../Comments/Comments";

export const PinDetails = () => {
  const dispatch = useDispatch();
  const { pin_id } = useParams();
  const pins = useSelector((state) => state.pinReducer);
  const [loading, setLoading] = useState(true);

  const pinId = Number(pin_id);
  const indvPin = pins[pinId];

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
      <div className="indv-pin-cont">
        <div className="indv-left-side">
          <img
            src={indvPin.image_url}
            alt={indvPin.title}
            className="indv-img"
          />
        </div>
        <div className="indv-right-side">
          <div className="indv-pin-info">
            <h1 className="indv-title">{indvPin.title}</h1>
            <p className="indv-desc">{indvPin.description}</p>
          </div>
          <div className="indv-user-info">
            <img
              src={indvPin.user[0].profile_picture}
              alt={indvPin.user[0].first_name}
              className="indv-profile-pic"
            />
            <p className="indv-user-fn">{indvPin.user[0].first_name}</p>
          </div>
          <CommentDetails />
        </div>
      </div>
      <h2 className="indv-more-to-explore">More to Explore</h2>
      <DisplayFeed />
    </div>
  );
};

export default PinDetails;

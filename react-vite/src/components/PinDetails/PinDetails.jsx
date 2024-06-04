import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPinsThunk } from "../../redux/pin";
import { useParams } from "react-router-dom";
import "./PinDetails.css";
import DisplayFeed from "../DisplayFeed/DisplayFeed";

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
        <img src={indvPin.image_url} alt={indvPin.title} />
        <img
          src={indvPin.user[0].profile_picture}
          alt={indvPin.user[0].first_name}
        />
        <p>{indvPin.user[0].first_name}</p>
        <h2>{indvPin.title}</h2>
        <p>{indvPin.description}</p>
      </div>
      <DisplayFeed />
    </div>
  );
};

export default PinDetails;

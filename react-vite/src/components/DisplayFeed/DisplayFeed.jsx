import "./DisplayFeed.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPinsThunk } from "../../redux/pin";

export const DisplayFeed = () => {
  const dispatch = useDispatch();
  const pins = useSelector((state) => state.pinReducer);
  const pinsArray = Object.values(pins);

  useEffect(() => {
    dispatch(loadPinsThunk());
  }, [dispatch]);

  return (
    <div>
      <div className="pins-container">
        {pinsArray.map((pin) => (
          <div key={pin.id} className="pin">
            <img src={pin.image_url} alt={pin.title} />
            <h2>{pin.title}</h2>
            <img
              src={pin.user[0].profile_picture}
              alt={pin.user[0].first_name}
            />
            <p>{pin.user[0].first_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayFeed;

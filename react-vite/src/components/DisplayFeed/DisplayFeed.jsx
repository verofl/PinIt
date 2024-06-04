import "./DisplayFeed.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPinsThunk } from "../../redux/pin";
import { useNavigate } from "react-router-dom";

export const DisplayFeed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pins = useSelector((state) => state.pinReducer);
  let pinsArray = Object.values(pins);

  // this is to randomize the pinsArray so that the images arent in the same place every single time
  pinsArray.sort(
    () => Math.floor(Math.random() * 1000) - Math.floor(Math.random() * 1000)
  );

  useEffect(() => {
    dispatch(loadPinsThunk());
  }, [dispatch]);

  return (
    <div>
      <div className="pins-cont">
        <div className="masonry-layout">
          {pinsArray.map((pin) => (
            <div
              key={pin.id}
              className="masonry-item"
              onClick={() => navigate(`/pins/${pin.id}`)}
            >
              <img
                src={pin.image_url}
                alt={pin.title}
                className="masonry-image"
              />
              <h3>{pin.title}</h3>
              <div className="display-user-details">
                <img
                  src={pin.user[0].profile_picture}
                  alt={pin.user[0].first_name}
                  className="masonry-user-profile-pic"
                />
                <p>{pin.user[0].first_name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisplayFeed;

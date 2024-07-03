import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadUserPinsThunk } from "../../redux/pin";
import "../DisplayFeed/DisplayFeed.css";
import "./CreatedPins.css";

export const CreatedPins = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.session.user);
  const user_pins = useSelector((state) => state.pinReducer);
  let pinsArray = Object.values(user_pins);

  console.log("PINS INFO ===>", pinsArray);

  // this is to randomize the pinsArray so that the images arent in the same place every single time
  pinsArray.sort(
    () => Math.floor(Math.random() * 1000) - Math.floor(Math.random() * 1000)
  );

  useEffect(() => {
    dispatch(loadUserPinsThunk(user.id));
  }, [dispatch]);

  return (
    <div>
      <div className="created-pins-cont">
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
              <h3 className="pin-title">{pin.title}</h3>
              <div className="display-user-details">
                <>
                  <img
                    src={user.profile_picture}
                    alt={user.first_name}
                    className="masonry-user-profile-pic"
                  />
                  <p>{user.first_name}</p>
                </>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreatedPins;

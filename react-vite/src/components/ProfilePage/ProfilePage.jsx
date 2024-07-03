import "./ProfilePage.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUserPinsThunk } from "../../redux/pin";
import CreatedPins from "./CreatedPins";

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.session.user);
  const user_pins = useSelector((state) => state.pinReducer);
  let pinsArray = Object.values(user_pins);

  useEffect(() => {
    dispatch(loadUserPinsThunk(user.id));
  }, [dispatch]);
  return (
    <div className="profile-page-div">
      <img src={user.profile_picture} className="pfp-profile-page"></img>
      <h1 className="profile-page-header">Created Pins</h1>
      <div className="user-pins-cont">
        <CreatedPins />
      </div>
    </div>
  );
};

import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPinsThunk } from "../../redux/pin";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import EditPin from "../EditPin/EditPin";
import { FaEdit } from "react-icons/fa";
import { useParams } from "react-router-dom";
import DisplayFeed from "../DisplayFeed/DisplayFeed";
import "./PinDetails.css";
import CommentDetails from "../Comments/Comments";

export const PinDetails = () => {
  const dispatch = useDispatch();
  const { pin_id } = useParams();
  const pins = useSelector((state) => state.pinReducer);

  const currentUser = useSelector((store) => store.session.user);
  const [showMenu, setShowMenu] = useState(false);

  const [loading, setLoading] = useState(true);

  const pinId = Number(pin_id);
  const indvPin = pins[pinId];
  // console.log("CURRENT USER ==>", currentUser);
  // console.log("PIN DETAILS ==>", indvPin);

  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(loadPinsThunk());

      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  if (loading || !indvPin.user) {
    return <p>Loading...</p>;
  }

  // if (!indvPin) {
  //   return <p>Pin not found</p>;
  // }

  let isOwner;
  if (currentUser) {
    isOwner = currentUser.id === indvPin.user_id;
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
            {isOwner && (
              <OpenModalMenuItem
                itemText={
                  <div className="edit-cont">
                    <FaEdit className="edit-icon" />
                  </div>
                }
                className="edit-bttn"
                onItemClick={closeMenu}
                modalComponent={<EditPin pin_id={indvPin.id} />}
              />
            )}
            <h1 className="indv-title">{indvPin.title}</h1>
            <p className="indv-desc">{indvPin.description}</p>
          </div>
          {currentUser && (
            <div className="indv-user-info">
              <img
                src={indvPin.user[0]?.profile_picture}
                alt={indvPin.user[0]?.first_name}
                className="indv-profile-pic"
              />
              <p className="indv-user-fn">{indvPin.user[0]?.first_name}</p>
            </div>
          )}
          <CommentDetails />
        </div>
      </div>
      {/* <h2 className="indv-more-to-explore">More to Explore</h2> */}
      <DisplayFeed />
    </div>
  );
};

export default PinDetails;

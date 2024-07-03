import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { FaAngleDown } from "react-icons/fa6";
import "./ProfileButton.css";

function ProfileButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);

  // console.log("HERE IS USER ==>>", user);
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

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
    navigate("/feed");
  };

  return (
    <>
      <div className="nav-user-container">
        {/* {!user && <FaUserCircle className="fa-user-circle" />} */}
        {!user && (
          <div className="nav-bttns">
            <OpenModalMenuItem
              itemText={<button className="login-bttn nav-bttn">Log In</button>}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText={
                <button className="signup-bttn nav-bttn">Sign Up</button>
              }
              modalComponent={<SignupFormModal />}
            />
          </div>
        )}
        {user && (
          <div className="pfp-nav-cont">
            <img
              src={user.profile_picture}
              className="nav-user-pic"
              onClick={() => navigate(`/profile`)}
            ></img>
            <FaAngleDown onClick={toggleMenu} className="down-arrow-dropdown" />
          </div>
        )}
      </div>
      {showMenu && (
        <ul className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <>
              <li>Hi! {user.username}</li>
              <li>{user.email}</li>
              <li>
                <button onClick={logout} className="logout-bttn">
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </>
          )}
        </ul>
      )}
    </>
  );
}

export default ProfileButton;

import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { FaSearch } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { useSelector } from "react-redux";

function Navigation() {
  const currentUser = useSelector((store) => store.session.user);

  const navigate = useNavigate();
  return (
    <div className="nav-bar">
      <img
        src="https://mypinitbucket.s3.amazonaws.com/P.png"
        className="nav-logo"
        onClick={() => navigate(`/feed`)}
      ></img>
      {/* <NavLink to="/feed" className="nav-navlink">
        Home
      </NavLink> */}
      <NavLink
        to="/feed"
        className={({ isActive }) =>
          isActive ? "active nav-navlink" : "nav-navlink"
        }
      >
        Home
      </NavLink>
      <NavLink to="/" className="nav-navlink">
        Explore
      </NavLink>
      {currentUser && (
        <NavLink to="/pins/new" className="nav-navlink">
          Create
        </NavLink>
      )}
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input type="search" placeholder="Search" className="search-input" />
      </div>
      <FaBell className="nav-icon" />
      <AiFillMessage className="nav-icon" />
      <ProfileButton />
    </div>
  );
}

export default Navigation;

import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { FaSearch } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";

function Navigation() {
  const navigate = useNavigate();
  return (
    <div className="nav-bar">
      <img
        src="../public/P.png"
        className="nav-logo"
        onClick={() => navigate(`/feed`)}
      ></img>
      <NavLink to="/feed" className="nav-navlink">
        Home
      </NavLink>
      <NavLink to="/" className="nav-navlink">
        Explore
      </NavLink>
      <NavLink to="/pins/new" className="nav-navlink">
        Create
      </NavLink>
      <div className="search-bar">
        <FaSearch />
        <input type="search" placeholder="Search" className="search-input" />
      </div>
      <FaBell className="nav-icon" />
      <AiFillMessage className="nav-icon" />
      <ProfileButton />
    </div>
  );
}

export default Navigation;

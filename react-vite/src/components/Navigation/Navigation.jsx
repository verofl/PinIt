import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

function Navigation() {
  const currentUser = useSelector((store) => store.session.user);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${searchQuery}`);
      setSearchQuery("");
    }
  };

  return (
    <div className="nav-bar">
      <img
        src="https://mypinitbucket.s3.amazonaws.com/P.png"
        className="nav-logo"
        onClick={() => navigate(`/feed`)}
        alt="Logo"
      />
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
      <form className="search-bar" onSubmit={handleSearch}>
        <FaSearch className="search-icon" />
        <input
          type="search"
          placeholder="Search"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
      <ProfileButton />
    </div>
  );
}

export default Navigation;

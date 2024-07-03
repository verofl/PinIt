import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { loadPinsThunk } from "../../redux/pin";
import "./SearchResults.css";

const SearchResults = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get("query");
  const pins = useSelector((state) => state.pinReducer);
  const pinsArray = Object.values(pins);

  useEffect(() => {
    dispatch(loadPinsThunk());
  }, [dispatch]);

  const searchResults = pinsArray.filter(
    (pin) =>
      pin.title.toLowerCase().includes(query.toLowerCase()) ||
      pin.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="search-results">
      <h2>Search Results for "{query}"</h2>
      <div className="search-pins-cont">
        <div className="masonry-layout">
          {searchResults.length > 0 ? (
            searchResults.map((pin) => (
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
                  {pin.user && pin.user.length > 0 ? (
                    <>
                      <img
                        src={pin.user[0].profile_picture}
                        alt={pin.user[0].first_name}
                        className="masonry-user-profile-pic"
                      />
                      <p>{pin.user[0].first_name}</p>
                    </>
                  ) : (
                    <p>Loading user...</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No results found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;

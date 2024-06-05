import { loadPinsThunk } from "../../redux/pin";
import { deleteCommentThunk } from "../../redux/comment";
import { useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import "./DeleteComment.css";

export const DeleteComment = ({ comment_id }) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

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

  // console.log("COMMENT ID DELETE ===>", comment_id);
  const deleteCommentEvent = (e) => {
    e.preventDefault();
    dispatch(deleteCommentThunk(comment_id));
    dispatch(loadPinsThunk());
    closeMenu();
  };

  return (
    <div className="delete-dot-cont">
      <div onClick={toggleMenu} className="delete-dots">
        <HiOutlineDotsHorizontal />
      </div>
      {showMenu && (
        <ul className="delete-dropdown" ref={ulRef}>
          <button onClick={deleteCommentEvent}>Delete</button>
        </ul>
      )}
    </div>
  );
};

export default DeleteComment;

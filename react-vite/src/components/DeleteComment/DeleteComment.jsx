import { loadPinsThunk } from "../../redux/pin";
import { deleteCommentThunk } from "../../redux/comment";
import { useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { useModal } from "../../context/Modal";
import EditComment from "../EditComment/EditComment";
import "./DeleteComment.css";

export const DeleteComment = ({ comment_id }) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  // const { closeModal } = useModal();

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
        <div className="delete-dropdown" ref={ulRef}>
          {/* <button onClick={deleteCommentEvent}>Edit</button> */}
          <span className="edit-bttn spans" onClick={closeMenu}>
            <OpenModalMenuItem
              itemText="Edit"
              onItemClick={closeMenu}
              modalComponent={<EditComment comment_id={comment_id} />}
            />
          </span>

          <span
            onClick={deleteCommentEvent}
            className="delete-comment-bttn spans"
          >
            Delete
          </span>
        </div>
      )}
    </div>
  );
};

export default DeleteComment;

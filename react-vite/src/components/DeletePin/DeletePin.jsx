import { deletePinThunk } from "../../redux/pin";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import "./DeletePin.css";

export const DeletePin = ({ pin_id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const deletePinEvent = (e) => {
    e.preventDefault();
    dispatch(deletePinThunk(pin_id));
    closeModal();
    navigate("/feed");
  };

  return (
    <div className="edit-delete-pin">
      <h1>Delete Confirmation</h1>
      <p>Are you sure you want to delete this pin?</p>
      <div className="delete-bttns-cont">
        <button onClick={closeModal} className="delete-pin-bttns cancel-b">
          Cancel
        </button>
        <button
          onClick={deletePinEvent}
          className="delete-button delete-pin-bttns"
        >
          {" "}
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeletePin;

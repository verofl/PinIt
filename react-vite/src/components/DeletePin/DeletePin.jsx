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
      <button onClick={closeModal} className="cancel-button delete-pin-bttns">
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
  );
};

export default DeletePin;

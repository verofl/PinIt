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
    <div>
      <button onClick={closeModal}>Cancel</button>
      <button onClick={deletePinEvent}> Delete</button>
    </div>
  );
};

export default DeletePin;

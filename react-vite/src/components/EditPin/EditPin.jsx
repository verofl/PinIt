import { updatePinThunk } from "../../redux/pin";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadPinsThunk } from "../../redux/pin";
import { useModal } from "../../context/Modal";
import "./EditPin.css";
import DeletePin from "../DeletePin/DeletePin";

export const EditPin = ({ pin_id }) => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const pins = useSelector((state) => state.pinReducer);
  const pinId = Number(pin_id);
  const indvPin = pins[pinId];
  const { closeModal } = useModal();

  const [image_url, setImage_Url] = useState(indvPin.image_url || null);
  const [title, setTitle] = useState(indvPin.title || "");
  const [description, setDescription] = useState(indvPin.description || "");
  const [category, setCategory] = useState(indvPin.category || "");
  const [validationErrors, setValidationErrors] = useState({});
  const [imageLoading, setImageLoading] = useState(false);
  const [hasSubmitted, setSubmitted] = useState(false);

  useEffect(() => {
    const errors = {};

    if (title.length < 2 || title.length > 100) {
      errors.title = "Title must be between 2 and 100 characters.";
    }
    if (description.length < 10 || description.length > 255) {
      errors.description = "Description must be between 10 and 255 characters.";
    }
    if (category.length < 2 || category.length > 55) {
      errors.category = "Category must be between 2 and 55 characters.";
    }

    setValidationErrors(errors);
  }, [title, description, category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("image_url", image_url);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    setImageLoading(true);
    setSubmitted(true);

    try {
      await dispatch(updatePinThunk(pinId, formData));
      closeModal();
      await dispatch(loadPinsThunk());
    } catch (error) {
      console.error("Error updating pin", error);
    } finally {
      setImageLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage_Url(file);
    }
  };

  const isSubmitDisabled = Object.values(validationErrors).length > 0;

  return (
    <div className="edit-modal-cont">
      <h1 className="update-header">Update Pin</h1>
      <form
        className="indv-edit-pin-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="indv-edit-pin-cont">
          <div className="image-edi-cont">
            <p className="input-edit-title">Image</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="form-input"
            />
          </div>

          <div className="create-edit-right-side">
            <p className="input-edit-title">Title</p>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
            />
            <div className="form-errors">{validationErrors.title}</div>

            <p className="input-edit-title">Description</p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-input"
            />
            <div className="form-errors">{validationErrors.description}</div>

            <p className="input-edit-title">Category</p>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-input"
            />
            <div className="form-errors">{validationErrors.category}</div>
          </div>
        </div>
        <button
          type="submit"
          className="form-edit-bttn"
          disabled={isSubmitDisabled}
        >
          Update
        </button>

        {imageLoading && Object.values(validationErrors).length > 0 && (
          <p>Loading...</p>
        )}
      </form>
      <DeletePin pin_id={pin_id} />
    </div>
  );
};

export default EditPin;

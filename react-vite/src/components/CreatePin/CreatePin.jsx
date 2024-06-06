import { createPinThunk } from "../../redux/pin";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./CreatePin.css";

export const CreatePin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [image_url, setImage_Url] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [imageLoading, setImageLoading] = useState(false);
  const [hasSubmitted, setSubmitted] = useState(false);

  useEffect(() => {
    const errors = {};

    if (!image_url) {
      errors.image_url = "Image is required";
    }

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
  }, [image_url, title, description, category]);

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
      const newPin = await dispatch(createPinThunk(formData));
      // console.log("NEW PIN ===>", newPin);

      navigate(`/pins/${newPin.id}`);
    } catch (error) {
      console.error("Error creating pin", error);
    } finally {
      setImageLoading(false);
    }
  };

  return (
    <div>
      <h1>Create Your New Pin</h1>
      <form
        className="pin-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="image-cont">
          <p className="input-title">Image</p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage_Url(e.target.files[0])}
          />
          <div className="form-errors">{validationErrors.image_url}</div>
        </div>

        <div className="create-right-side">
          <p className="input-title">Title</p>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
          />
          <div className="form-errors">{validationErrors.title}</div>

          <p className="input-title">Description</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-input"
          />
          <div className="form-errors">{validationErrors.description}</div>

          <p className="input-title">Category</p>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-input"
          />
          <div className="form-errors">{validationErrors.category}</div>
        </div>

        <button
          type="submit"
          className="form-submit-bttn"
          disabled={Object.keys(validationErrors).length > 0}
        >
          Submit
        </button>

        {imageLoading && Object.values(validationErrors).length > 0 && (
          <p>Loading...</p>
        )}
      </form>
    </div>
  );
};

export default CreatePin;

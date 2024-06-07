import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (username.length < 2 || username.length > 50) {
      newErrors.username = "Username must be between 2 and 50 characters.";
    }
    if (!email.includes("@") || !email.includes(".")) {
      newErrors.email = "Email address is invalid.";
    }
    if (first_name.length < 2 || first_name.length > 50) {
      newErrors.first_name = "First name must be between 2 and 50 characters.";
    }
    if (last_name.length < 2 || last_name.length > 50) {
      newErrors.last_name = "Last name must be between 2 and 50 characters.";
    }
    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords must match.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    let profile_picture =
      "https://res.cloudinary.com/djqcfdrbm/image/upload/v1717724139/WuberEats/rick-roll_naod17.jpg";

    const serverResponse = await dispatch(
      thunkSignup({
        username,
        email,
        first_name,
        last_name,
        profile_picture,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit} className="signup-form-modal">
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {errors.username && (
            <p className="error-message">{errors.username}</p>
          )}
        </label>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </label>
        <label>
          First Name
          <input
            type="text"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          {errors.first_name && (
            <p className="error-message">{errors.first_name}</p>
          )}
        </label>
        <label>
          Last Name
          <input
            type="text"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          {errors.last_name && (
            <p className="error-message">{errors.last_name}</p>
          )}
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errors.confirmPassword && (
            <p className="error-message">{errors.confirmPassword}</p>
          )}
        </label>
        <button type="submit" className="signup-modal-bttn">
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignupFormModal;

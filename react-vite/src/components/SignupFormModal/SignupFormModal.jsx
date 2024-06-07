import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    // let profile_picture =
    //   "https://res.cloudinary.com/djqcfdrbm/image/upload/v1717723809/WuberEats/cat-pfp_ul67ue.jpg";

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
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}

        <label>
          First Name
          <input
            type="text"
            value={first_name}
            onChange={(e) => setfirst_name(e.target.value)}
            required
          />
        </label>
        {errors.first_name && <p>{errors.first_name}</p>}

        <label>
          Last Name
          <input
            type="text"
            value={last_name}
            onChange={(e) => setlast_name(e.target.value)}
            required
          />
        </label>
        {errors.last_name && <p>{errors.last_name}</p>}

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button type="submit" className="signup-modal-bttn">
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignupFormModal;

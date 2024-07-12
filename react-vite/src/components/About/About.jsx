import "./About.css";
import { Link } from "react-router-dom";

export const About = () => {
  return (
    <div className="about-page">
      <h1>About Me</h1>
      <img
        src="https://res.cloudinary.com/djqcfdrbm/image/upload/v1720823942/image_ts9ftk.png"
        className="my-image"
      />
      <Link to="https://www.linkedin.com/in/veronica-flatto/" target="_blank">
        Linkedin
      </Link>
      <Link to="https://github.com/verofl" target="_blank">
        Github
      </Link>
      <Link to="https://verofl.github.io/" target="_blank">
        Portfolio
      </Link>
    </div>
  );
};

export default About;

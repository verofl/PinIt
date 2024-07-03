import "./About.css";
import { Link } from "react-router-dom";

export const About = () => {
  return (
    <div className="about-page">
      <h1>About Me</h1>
      <Link to="" target="_blank">
        Linkedin
      </Link>
      <Link to="" target="_blank">
        Github
      </Link>
      <Link to="" target="_blank">
        Portfolio
      </Link>
    </div>
  );
};

export default About;

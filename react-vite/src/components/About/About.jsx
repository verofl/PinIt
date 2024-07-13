import "./About.css";
import { Link } from "react-router-dom";

export const About = () => {
  return (
    <div className="about-page">
      <h1 className="about-header">About Me</h1>
      <img
        src="https://res.cloudinary.com/djqcfdrbm/image/upload/v1720823942/image_ts9ftk.png"
        className="my-image"
      />
      <div className="about-links">
        <Link
          to="https://www.linkedin.com/in/veronica-flatto/"
          target="_blank"
          className="links"
        >
          Linkedin
        </Link>
        <Link to="https://github.com/verofl" target="_blank" className="links">
          Github
        </Link>
        <Link to="https://verofl.github.io/" target="_blank" className="links">
          Portfolio
        </Link>
      </div>
      {/* <p>Hi! My name is Veronica Flatto.</p> */}
      {/* </br>  */}
      <p className="about-me-p">
        {" "}
        Hi! My name is Veronica Flatto. I am a software engineer with a
        background in full-stack development, holding a BA in Psychology from UC
        Irvine and a Full Stack Web Development certification from App Academy.
        My expertise includes JavaScript, Python, Flask, React, Redux, SQL, and
        more. This is my fullstack project that replicates the numerous features
        that Pinterest has. I hope you enjoy it!
      </p>
      {/* <h2 className="about-header">Check out my other project!</h2>
      <img
        src="https://mypinitbucket.s3.amazonaws.com/mythicalBnB.gif"
        className=""
        onClick={() => navigate(`/feed`)}
        alt="Logo"
      /> */}
    </div>
  );
};

export default About;

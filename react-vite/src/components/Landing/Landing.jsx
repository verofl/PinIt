import "./Landing.css";

export const Landing = () => {
  return (
    <div className="ladngin-cont">
      <div className="full-screen-image-container">
        <img src={"./public/landing.jpg"} className="full-screen-image"></img>
      </div>
      <div className="heading-cont">
        <h1 className="pinit-heading">
          LIKE IT
          <br />
          PIN IT
        </h1>
      </div>
    </div>
  );
};

export default Landing;

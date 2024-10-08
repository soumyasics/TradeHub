import React from "react";
import "./Landingpage.css";
import landingpage from "../../assets/images/landingpage.png";
import { useNavigate } from "react-router-dom";
function Landingpage() {
  const navigate = useNavigate()
  return (
    <div>
      {/* <MainNav/> */}
      <div className="landing-page-color">
        <div className="row">
          <div className="col-5">
            <img
              className="landingpage-img container"
              src={landingpage}
              alt="img"
            ></img>
          </div>
          <div className="col-7">
            <p className="landing-page-para">
              Explore a dynamic<br></br>
              exchange platform
            </p>
            <p className="landing-page-para1">
              Where perference meets needs, brought right your door
            </p>
            <div>
              <button
                type="button"
                className="landing-page-button"
                onClick={() => {
                  navigate("/user/view-all-items");
                }}
              >
                Explore Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landingpage;

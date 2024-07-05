import React from "react";
import "./deliveryforgotpassword.css";
import img1 from "../../../assets/images/passwordImg.png";
import MainNav from "../../homeComponents/Navbar/MainNav";
import Footer from "../../Footer/Footer";

function Deliveryforgotpassword() {
  return (
    <div>
      <div>
        <MainNav/>
      </div>
      <div className="mb-5 container">
        <div className="deliveryagent-forgot-box ">
          <div className="row">
            <div className="col">
              <img src={img1} alt="img" className="deliveryagent-forgot-img"></img>
            </div>
            <form className="col">
              <div className="container mt-5 text-center">
                <h2>Forget Password</h2>
              </div>
              <div>
                <div>
                  <div>
                    <input
                      type="email"
                      className="deliveryagent-forgot-textbox mt-5"
                      placeholder="Enter email"
                      name="email"
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      className="deliveryagent-forgot-textbox mt-5"
                      placeholder="Enter new Password"
                      name="password"
                    />
                  </div>
                </div>
                <div>
                  <input
                    type="password"
                    className="deliveryagent-forgot-textbox mt-5"
                    placeholder="Re-Enter new Password"
                    name="confirmpassword"
                  />
                </div>
              </div>
              <div className="text-center">
                <button type="submit" className="deliveryagent-forgot-btn mt-5">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
       
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  );
}

export default Deliveryforgotpassword;

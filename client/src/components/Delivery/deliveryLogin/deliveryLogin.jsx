import React, { useState } from "react";
import "./deliveryLogin.css";
import img1 from "../../../assets/images/agentphoto.png";
import { Link } from "react-router-dom";
import MainNav from "../../homeComponents/Navbar/MainNav";
import Footer from "../../Footer/Footer";
import toast from "react-hot-toast";

function DeliveryAgentLogin() {


  return (
    <div>
      <div>
        <MainNav/>
      </div>
      <div className="mt-5 container">
        <div className="deliveryagent-login-box mb-5">
          <div className="row">
            <div className="col">
              <img
                src={img1}
                alt="img"
                className="deliveryagent-login-img"
              ></img>
            </div>
            <div className="col">
              <div className="text-center mt-5">
                <h2>Delivery agent Login</h2>
              </div>
              <div>
                <form >
                  <div className="deliveryagent-inputs">
                    <label className="deliveryagent-login ms-2">
                      User name
                    </label>
                    <input
                      className="deliveryagent-login-textbox ms-3 px-3"
                      type="text"
                      name="username"
                      placeholder="Enter Username" 
                    />
                  </div>
                  <div>
                    <label className="deliveryagent-login mt-5 ms-2">
                      Password
                    </label>
                    <input
                      className="deliveryagent-login-textbox-pass ms-4 px-3"
                      type="password"
                      name="password"
                      placeholder="Enter Password"
                    />
                  </div>
                  <div className="mt-3 deliveryagent-login-link container">
                    <Link to="/agentforgotpassword" href="#">Forget Password?</Link>
                  </div>
                  <button
                    type="submit"
                    className="deliveryagent-login-btn mt-5"
                  >
                    Login
                  </button>
                  <div className="mt-4 ms-5">
                    <h6 className="text-center">
                      New to TradeHub Delivery? <Link  to="/agent/signup" href="#">Register Now</Link>
                    </h6>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  );
}

export default DeliveryAgentLogin;

import React, { useState } from "react";
import "./deliveryLogin.css";
import img1 from "../../../assets/images/agentphoto.png";
import { Link, useNavigate } from "react-router-dom";
import MainNav from "../../homeComponents/Navbar/MainNav";
import Footer from "../../Footer/Footer";
import toast from "react-hot-toast";
import axios from "axios";
import axiosInstance from "../../../apis/axiosInstance";

function DeliveryAgentLogin() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const navigate = useNavigate()
  const checkValidate = () => {
    const { email, password } = data;

    if (!email) {
      toast.error("Please enter a user name");
      return false;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!password) {
      toast.error("Please enter password");
      return false;
    }
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must contain at least one number, one special character, and one capital letter"
      );
      return false;
    }
    return true
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    if (!checkValidate()) {
      return;
    }
    sendDataToServer();
  };
  const sendDataToServer = () => {
    axiosInstance
      .post("/deliveryLogin", data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Login sucessfully");
          navigate("/delivery/home");
        }
      })
      .catch((err) => {
        console.log("Error on delivery login",err);
        toast.error("Please check your email id and password.")
      });
  };

  return (
    <div>
      <div>
        <MainNav />
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
                <form onSubmit={handleSubmit}>
                  <div className="deliveryagent-inputs">
                    <label className="deliveryagent-login ms-2">
                      User name
                    </label>
                    <input
                      className="deliveryagent-login-textbox ms-3 px-3"
                      type="text"
                      name="email"
                      value={data.email}
                      placeholder="Enter User name"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="deliveryagent-login mt-5 ms-2">
                      Password
                    </label>
                    <input
                      className="deliveryagent-login-textbox-pass ms-4 px-3"
                      type="password"
                      value={data.password}
                      name="password"
                      placeholder="Enter Password"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mt-3 deliveryagent-login-link container">
                    <Link to="/agentforgotpassword" href="#">
                      Forget Password?
                    </Link>
                  </div>
                  <button
                    type="submit"
                    className="deliveryagent-login-btn mt-5"
                  >
                    Login
                  </button>
                  <div className="mt-4 ms-5">
                    <h6 className="text-center">
                      New to TradeHub Delivery?{" "}
                      <Link to="/agent/signup" href="#">
                        Register Now
                      </Link>
                    </h6>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default DeliveryAgentLogin;

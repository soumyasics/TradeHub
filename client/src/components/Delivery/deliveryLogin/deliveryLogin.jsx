import React, { useState } from "react";
import "./deliveryLogin.css";
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import img1 from "../../../assets/images/agentphoto.png";
import { Link, useNavigate } from "react-router-dom";
import MainNav from "../../homeComponents/Navbar/MainNav";
import Footer from "../../Footer/Footer";
import toast from "react-hot-toast";
import axios from "axios";
import axiosInstance from "../../../apis/axiosInstance";
import UserNavbar from "../../homeComponents/Navbar/UserNavbar";

function DeliveryAgentLogin() {
  const [show, setShow] = useState(true);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleShow = () => {
    setShow(!show);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const navigate = useNavigate();
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
    return true;
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
          const userId = res?.data?.data?._id || null;
          if (userId) {
            localStorage.setItem("trade-hub-DAId", userId);
          }
          toast.success("Login sucessfully");
          navigate("/delivery/dashboard");
        }
      })
      .catch((err) => {
        const status = err?.response?.status;
        if (status === 400 || status === 404 || status === 500) {
          const msg = err?.response?.data?.msg;
          toast.error(msg);
        } else {
          toast.error("Network issue. Please try again");
        }
        console.log("Error on delivery login", err);
      });
  };

  return (
    <div>
      <div>
        <UserNavbar />
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
                  <div className="deliveryagent-inputs d-flex">
                    <div className="del-login-label-box">
                      <label className="deliveryagent-login ">Email</label>
                    </div>
                    <input
                      className="deliveryagent-login-textbox  px-3"
                      type="text"
                      name="email"
                      value={data.email}
                      placeholder="Enter User name"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="d-flex">
                    <div className="del-login-label-box">
                      <label className="deliveryagent-login ">Password</label>
                    </div>
                    {/* <input
                      className="deliveryagent-login-textbox-pass ms-4 px-3"
                      type={show?"password":"text"}
                      value={data.password}
                      name="password"
                      placeholder="Enter Password"
                      onChange={handleChange}
                    /> */}
                    <InputGroup className="del-login-password-box ">
                      <Form.Control
                        className="del-login-password-inp"
                        type={show ? "password" : "text"}
                        value={data.password}
                        name="password"
                        placeholder="Enter Password"
                        onChange={handleChange}
                        aria-label="password"
                        aria-describedby="basic-addon1"
                      />
                      <InputGroup.Text
                        id="basic-addon1"
                        className="userlogin-eye-box"
                      >
                        {show ? (
                          <FaEyeSlash
                            className="userLogin-toggleEye"
                            onClick={handleShow}
                          />
                        ) : (
                          <FaRegEye
                            className="userLogin-toggleEye"
                            onClick={handleShow}
                          />
                        )}
                      </InputGroup.Text>
                    </InputGroup>
                  </div>
                  <div className="mt-3 deliveryagent-login-link container">
                    <Link to="/agentforgotpassword" href="#">
                      Forgot Password?
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
                      <Link to="/delivery/signup" href="#">
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

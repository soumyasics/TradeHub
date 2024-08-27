import React, { useState } from "react";
import "./deliveryforgotpassword.css";
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import img1 from "../../../assets/images/passwordImg.png";
import MainNav from "../../homeComponents/Navbar/MainNav";
import Footer from "../../Footer/Footer";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../../../apis/axiosInstance";
import UserNavbar from "../../homeComponents/Navbar/UserNavbar";

function Deliveryforgotpassword() {
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(true);
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const Navigate = useNavigate();
  const handleShow1 = () => {
    setShow1(!show1);
  };
  const handleShow2 = () => {
    setShow2(!show2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
    setError((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let error = {};
    let formValid = true;

    if (!data.email.trim()) {
      formValid = false;
      error.email = "Email is required";
    }

    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{6,}$/;
    if (!data.password.trim()) {
      formValid = false;
      error.password = "Password is required";
    } else if (!passwordRegex.test(data.password)) {
      // Pass the password to the test method
      formValid = false;
      error.password =
        "Password must contain at least one number, one special character, and one capital letter";
    }

    if (!data.confirmPassword.trim()) {
      formValid = false;
      error.confirmPassword = "Confirm Password is required";
    } else if (data.confirmPassword !== data.password) {
      formValid = false;
      error.confirmPassword = "Passwords do not match";
    }

    setError(error);
    if (formValid) {
      axiosInstance
        .post("/deliveryForgotPassword", data)
        .then((res) => {
          if (res.data.status == 200) {
            toast.success(res.data.msg);
            Navigate("/delivery/login");
          } else {
            toast.error(res.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    }
  };

  return (
    <div>
      <div>
        <UserNavbar />
      </div>
      <div className="mb-5 container">
        <div className="deliveryagent-forgot-box ">
          <div className="row">
            <div className="col">
              <img
                src={img1}
                alt="img"
                className="deliveryagent-forgot-img"
              ></img>
            </div>
            <form className="col" onSubmit={handleSubmit}>
              <div className="container mt-5 text-center">
                <h2>Forgot Password?</h2>
              </div>
              <div>
                <div>
                  <div className="">
                    <input
                      type="email"
                      className="user-forget-textbox mt-5"
                      placeholder="Enter email"
                      name="email"
                      value={data.email}
                      onChange={handleChange}
                    />
                    {error.email && (
                      <div className="user-forget-div text-danger">
                        {error.email}
                      </div>
                    )}
                  </div>
                  <div>
                    {/* <input
                      type="password"
                      className="deliveryagent-forgot-textbox mt-5"
                      placeholder="Enter new Password"
                      name="password"
                      value={data.password}
                      onChange={handleChange}
                    /> */}
                    <InputGroup className="del-forget-password-box ">
                      <Form.Control
                        className="del-forget-password-inp"
                        type={show1 ? "password" : "text"}
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        aria-label="password"
                        placeholder="Password"
                        aria-describedby="basic-addon1"
                      />
                      <InputGroup.Text
                        id="basic-addon1"
                        className="del-forget-eye-box"
                      >
                        {show1 ? (
                          <FaEyeSlash
                            className="del-forget-toggleEye"
                            onClick={handleShow1}
                          />
                        ) : (
                          <FaRegEye
                            className="del-forget-toggleEye"
                            onClick={handleShow1}
                          />
                        )}
                      </InputGroup.Text>
                    </InputGroup>

                    {error.password && (
                      <div className="user-forget-div text-danger">
                        {error.password}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  {/* <input
                    type="password"
                    className="deliveryagent-forgot-textbox mt-5"
                    placeholder="Re-Enter new Password"
                    name="confirmPassword"
                    onChange={handleChange}
                  /> */}

                  <InputGroup className="del-forget-password-box ">
                    <Form.Control
                      className="user-forget-password-inp"
                      type={show2 ? "password" : "text"}
                      placeholder="Re-Enter new Password"
                      name="confirmPassword"
                      onChange={handleChange}
                      value={data.confirmPassword}
                      aria-label="password"
                      aria-describedby="basic-addon1"
                    />
                    <InputGroup.Text
                      id="basic-addon1"
                      className="user-forget-eye-box"
                    >
                      {show2 ? (
                        <FaEyeSlash
                          className="del-forget-toggleEye"
                          onClick={handleShow2}
                        />
                      ) : (
                        <FaRegEye
                          className="del-forget-toggleEye"
                          onClick={handleShow2}
                        />
                      )}
                    </InputGroup.Text>
                  </InputGroup>

                  {error.confirmPassword && (
                    <div className="user-forget-div text-danger">
                      {error.confirmPassword}
                    </div>
                  )}
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
        <Footer />
      </div>
    </div>
  );
}

export default Deliveryforgotpassword;

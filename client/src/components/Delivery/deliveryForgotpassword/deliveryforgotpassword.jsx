import React, { useState } from "react";
import "./deliveryforgotpassword.css";
import img1 from "../../../assets/images/passwordImg.png";
import MainNav from "../../homeComponents/Navbar/MainNav";
import Footer from "../../Footer/Footer";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../../../apis/axiosInstance";

function Deliveryforgotpassword() {
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
          console.log(res);
          alert(res.data.msg);
          Navigate("/delivery/login");
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
        <MainNav />
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
                    <input
                      type="password"
                      className="deliveryagent-forgot-textbox mt-5"
                      placeholder="Enter new Password"
                      name="password"
                      value={data.password}
                      onChange={handleChange}
                    />
                    {error.password && (
                      <div className="user-forget-div text-danger">
                        {error.password}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <input
                    type="password"
                    className="deliveryagent-forgot-textbox mt-5"
                    placeholder="Re-Enter new Password"
                    name="confirmPassword"
                    onChange={handleChange}
                  />

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

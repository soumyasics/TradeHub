import React, { useState } from "react";
import "./Moderator.css";
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import MainNav from "../homeComponents/Navbar/MainNav";
import Footer from "../Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import moderatorforget from "../../assets/images/moderatorforget.jpg";
import axiosInstance from "../../apis/axiosInstance";
import toast, { Toast } from "react-hot-toast";
import UserNavbar from "../homeComponents/Navbar/UserNavbar";
function Moderatorforget() {
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(true);
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });
  const handleShow1 = () => {
    setShow1(!show1);
  };
  const handleShow2 = () => {
    setShow2(!show2);
  };

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });

  const Navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    let formValid = true;

    if (!data.email.trim()) {
      formValid = false;
      errors.email = "Email is required";
    }

    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{6,}$/;
    if (!data.password.trim()) {
      formValid = false;
      errors.password = "Password is required";
    } else if (!passwordRegex.test(data.password)) {
      formValid = false;
      errors.password =
        "Password must contain at least one number, one special character, and one capital letter";
    }

    if (!data.confirmpassword.trim()) {
      formValid = false;
      errors.confirmpassword = "Confirm Password is required";
    } else if (data.confirmpassword !== data.password) {
      formValid = false;
      errors.confirmpassword = "Passwords do not match";
    }

    setErrors(errors);

    if (formValid) {
      axiosInstance
        .post("/forgotPasswordUserModerators", data)
        .then((res) => {
          if (res.data.status == 200) {
            console.log(res);
            toast.success(res.data.msg);
            Navigate("/moderator/login");
          } else {
            toast.error(res.data?.msg || "Please check your email id.");
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
      <UserNavbar />

      <div className="ms-5 mt-5">
        <Link to="/moderator/login" className="moderator-forget-link">
          <FaArrowLeft />
        </Link>
      </div>

      <div className="mb-5 container">
        <div className="moderator-forget-box ">
          <div className="row">
            <div className="col">
              <img
                src={moderatorforget}
                alt="img"
                className="moderator-forget-img"
              ></img>
            </div>
            <div className="col">
              <div className="container mt-5 text-center">
                <h2>Forgot password?</h2>
              </div>
              <form onSubmit={handleSubmit}>
                <div>
                  <div>
                    <input
                      type="email"
                      className="moderator-forget-textbox mt-5"
                      placeholder="Enter email"
                      name="email"
                      value={data.email}
                      onChange={handleInputChange}
                    />
                    {errors.email && (
                      <div className="user-forget-div text-danger">
                        {errors.email}
                      </div>
                    )}
                  </div>
                  <div>
                    {/* <input
                      type="password"
                      className="moderator-forget-textbox mt-5"
                      placeholder="Enter new Password"
                      name="password"
                      value={data.password}
                      onChange={handleInputChange}
                    /> */}

                    <InputGroup className="mod-forget-password-box ">
                      <Form.Control
                        className="mod-forget-password-inp"
                        type={show1 ? "password" : "text"}
                        name="password"
                        value={data.password}
                        onChange={handleInputChange}
                        aria-label="password"
                        placeholder="Password"
                        aria-describedby="basic-addon1"
                      />
                      <InputGroup.Text
                        id="basic-addon1"
                        className="user-forget-eye-box"
                      >
                        {show1 ? (
                          <FaEyeSlash
                            className="mod-forget-toggleEye"
                            onClick={handleShow1}
                          />
                        ) : (
                          <FaRegEye
                            className="mod-forget-toggleEye"
                            onClick={handleShow1}
                          />
                        )}
                      </InputGroup.Text>
                    </InputGroup>

                    {errors.password && (
                      <div className="user-forget-div text-danger">
                        {errors.password}
                      </div>
                    )}
                  </div>
                  <div>
                    {/* <input
                      type="password"
                      className="moderator-forget-textbox mt-5"
                      placeholder="Re-Enter new Password"
                      name="confirmpassword"
                      value={data.confirmpassword}
                      onChange={handleInputChange}
                    /> */}

                    <InputGroup className="mod-forget-password-box ">
                      <Form.Control
                        className="user-forget-password-inp"
                        type={show2 ? "password" : "text"}
                        placeholder="Re-Enter new Password"
                        name="confirmpassword"
                        value={data.confirmpassword}
                        onChange={handleInputChange}
                        aria-label="password"
                        aria-describedby="basic-addon1"
                      />
                      <InputGroup.Text
                        id="basic-addon1"
                        className="user-forget-eye-box"
                      >
                        {show2 ? (
                          <FaEyeSlash
                            className="mod-forget-toggleEye"
                            onClick={handleShow2}
                          />
                        ) : (
                          <FaRegEye
                            className="mod-forget-toggleEye"
                            onClick={handleShow2}
                          />
                        )}
                      </InputGroup.Text>
                    </InputGroup>
                      {errors.confirmpassword && (
                        <div className="user-forget-div text-danger">
                          {errors.confirmpassword}
                        </div>
                      )}
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit" className="moderator-forget-btn mt-5">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div></div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Moderatorforget;

import React, { useEffect, useState } from "react";
import "./User.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import adminlogin from "../../assets/images/adminlogin.jpg";
import { Link, useNavigate } from "react-router-dom";
import MainNav from "../homeComponents/Navbar/MainNav";
import Footer from "../Footer/Footer";
import axiosInstance from "../../apis/axiosInstance";
import { toast } from "react-hot-toast";
import UserNavbar from "../homeComponents/Navbar/UserNavbar";

function Userlogin() {
  const [show, setShow] = useState(true);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleShow = () => {
    setShow(!show);
  };

  useEffect(() => {
    let isUserLoggedin = localStorage.getItem("trade-hub-userId") || null;
    if (isUserLoggedin) {
      navigate("/user/home");
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const checkValidity = () => {
    const { email, password } = data;
    if (!email) {
      toast.error("Email is required");
      return false;
    }
    if (!password) {
      toast.error("Password is required");
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

    if (!checkValidity()) {
      return;
    }

    sendDataToServer();
  };

  const sendDataToServer = () => {
    axiosInstance
      .post("/loginUser", data)
      .then((res) => {
        if (res?.data?.status === 200) {
          const userId = res?.data?.data?._id || null;
          const isFirstTimeLoggingIn = res?.data?.loginFirstTime || false;

          if (userId) {
            localStorage.setItem("trade-hub-userId", userId);
          }
          if (isFirstTimeLoggingIn) {
            toast.success(
              "Congratulations! You have received 500 wallet points as a welcome bonus."
            );
          } else {
            toast.success("Login Successful");
          }

          console.log("respo", res);
          navigate("/user/home");
        } else if (res?.data?.status === 405) {
          const msg = res.data?.msg || "Please check your email and password";
          toast.error(msg);
        } else {
          toast.error("Please check your email and password");
        }
      })
      .catch((err) => {
        console.log("Error", err);
        toast.error("Login failed.");
      });
  };

  return (
    <div>
      <UserNavbar />
      <div>
        <div className="container user-login-box mb-5 mt-5">
          <div className=" user-login-box1">
            <Row>
              <Col className="container">
                <img
                  className="user-login-img"
                  src={adminlogin}
                  alt="img"
                ></img>
              </Col>
              <Col>
                <h2 className="user-login-h2">User Login</h2>
                <form onSubmit={handleSubmit}>
                  <div className="d-flex">
                    <div className="login-label-box">
                      {" "}
                      <label className="user-login mt-4 ms-4">Email</label>
                    </div>
                    <input
                      className="user-login-textbox  ps-3"
                      placeholder="Email"
                      type="email"
                      name="email"
                      value={data.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="d-flex">
                    <div className="login-label-box">
                      {" "}
                      <label className="user-login mt-2 ms-4">Password</label>
                    </div>
                    {/* <input
                      className="user-login-textbox ms-2 ps-3"
                      placeholder="Password"
                      type={show ? "password" : "text"}
                      name="password"
                      value={data.password}
                      onChange={handleChange}
                    /> */}
                    <InputGroup className="user-login-password-box   ">
                      <Form.Control
                        className="user-login-password-inp"
                        type={show ? "password" : "text"}
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        aria-label="password"
                        placeholder="Password"
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
                  <div className="mt-3">
                    <Link to="/user/forgetpswd" className="user-login-forget">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="d-flex justify-content-center mt-5">
                    <button type="submit" className="user-login-btn ">
                      Login
                    </button>
                  </div>
                  <div className="mt-4">
                    <h6 className="text-center">
                      New to TradeHub?{" "}
                      <Link to="/user/register" className="">
                        Register Now
                      </Link>
                    </h6>
                  </div>
                </form>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Userlogin;

import React, { useState } from "react";
import "./User.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import adminlogin from "../../assets/images/adminlogin.png";
import { Link, useNavigate } from "react-router-dom";
import MainNav from "../homeComponents/Navbar/MainNav";
import Footer from "../Footer/Footer";
import axiosInstance from "../../apis/axiosInstance";
import { toast } from "react-hot-toast";
import UserNavbar from "../homeComponents/Navbar/UserNavbar";
function Userlogin() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

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
          if (userId) {
            localStorage.setItem("trade-hub-userId", userId);
          }
          toast.success("Login Successfully");
          console.log("respo", res)
          navigate("/user/home");
        } else if (res?.data?.status === 405) {
          const msg = res.data?.msg || "Please check your email and password";
          toast.error(msg);
        }else {
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
                  <div>
                    <label className="user-login mt-5 ms-5">Email</label>
                    <input
                      className="user-login-textbox ms-5 ps-3"
                      placeholder="Email"
                      type="email"
                      name="email"
                      value={data.email}
                      onChange={handleChange}
                    ></input>
                  </div>
                  <div>
                    <label className="user-login mt-5 ms-5">Password</label>
                    <input
                      className="user-login-textbox ms-2 ps-3"
                      placeholder="Password"
                      type="password"
                      name="password"
                      value={data.password}
                      onChange={handleChange}
                    ></input>
                  </div>
                  <div className="mt-3">
                    <Link to="/user/forgetpswd" className="user-login-forget">
                      Forget Password?
                    </Link>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="user-login-btn mt-5">
                      Login
                    </button>
                  </div>
                  <div className="mt-4 ms-5">
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

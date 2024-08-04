import React, { useState } from "react";
import "../Admin.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import adminlogin from "../../../assets/images/adminlogin.jpg";
import { useNavigate } from "react-router-dom";
import Footer from "../../Footer/Footer";
import { AdminNavbar } from "../adminNavbar/adminNavbar";
import { toast } from "react-hot-toast";
import UserNavbar from "../../homeComponents/Navbar/UserNavbar";
function Adminlogin() {
  const [show, setShow] = useState(true);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  let realEmail = "admin@gmail.com";
  let realPassword = "admin@123";

  const handleShow = () => {
    setShow(!show);
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  console.log("data", data);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = data;
    if (!email) {
      toast.error("Please Enter Email");
      return;
    }
    if (!password) {
      toast.error("Please Enter Password");
      return;
    }
    if (email === realEmail && password === realPassword) {
      toast.success("Login Successfull");
      navigate("/admin/dashboard");
    } else {
      toast.error("Please check your email id and password.");
      return;
    }
  };

  return (
    <div>
      <UserNavbar />
      <div className="container admin-login-box mb-5 mt-5">
        <div className=" admin-login-box1 ">
          <Row>
            <Col className="container">
              <img className="admin-login-img" src={adminlogin} alt="img"></img>
            </Col>
            <Col>
              <h2 className="admin-login-h2">Admin Login</h2>
              <form>
                <div className="d-flex">
                  <div className="admin-login-label-box">
                    <label className="admin-login mt-4 ">Email</label>
                  </div>
                  <input
                    className="admin-login-textbox1  ps-3 mt-3"
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                </div>
                <div className="d-flex">
                  <div className="admin-login-label-box">
                    <label className="admin-login mt-2 ">Password</label>
                  </div>{" "}
                  {/* <input
                    className="admin-login-textbox ms-2 ps-3"
                    type={show?"password":"text"}
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    placeholder="Password"
                  /> */}
                  <InputGroup className="user-login-password-box   ">
                    <Form.Control
                      className="user-login-password-inp"
                      type={show ? "password" : "text"}
                      name="password"
                      value={data.password}
                      onChange={handleChange}
                      placeholder="Password"
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
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="admin-login-btn2 mt-5"
                    onClick={handleSubmit}
                  >
                    Login
                  </button>
                </div>
              </form>
            </Col>
          </Row>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Adminlogin;

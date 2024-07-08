import React, { useState } from "react";
import "../Admin.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import adminlogin from "../../../assets/images/adminlogin.jpg";
import { useNavigate } from "react-router-dom";
import Footer from "../../Footer/Footer";
import { AdminNavbar } from "../adminNavbar/adminNavbar";
import { toast } from "react-hot-toast";
import UserNavbar from "../../homeComponents/Navbar/UserNavbar";
function Adminlogin() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  let realEmail = "admin@gmail.com";
  let realPassword = "admin@123";

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
                <div>
                  <label className="admin-login mt-5 ms-5">Email</label>
                  <input
                    className="admin-login-textbox ms-5 ps-3"
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                </div>
                <div>
                  <label className="admin-login mt-5 ms-5">Password</label>
                  <input
                    className="admin-login-textbox ms-2 ps-3"
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    placeholder="Password"
                  />
                </div>
                <button
                  type="submit"
                  className="admin-login-btn mt-5"
                  onClick={handleSubmit}
                >
                  Login
                </button>
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

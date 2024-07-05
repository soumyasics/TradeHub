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

  let mail = "admin@gmail.com";
  let pass = "admin@123";

  const [errors, setErrors] = useState({
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
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};
    setErrors(errors);

    if (!errors.email && !errors.password) {
      // const values = { email: data.email, password: data.password };
      if (mail == data.email && pass == data.password) {
        toast.success("Login Successfully");
        navigate("/admin/dashboard");
      } else {
        alert("Username or password is incorrect");
      }
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
                  {errors.email && (
                    <div className="container ms-5 text-danger">
                      {errors.email}
                    </div>
                  )}
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
                  {errors.password && (
                    <div className="container me-1 text-danger">
                      {errors.password}
                    </div>
                  )}
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

import React, { useState } from "react";
import "./Moderator.css";
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import MainNav from "../homeComponents/Navbar/MainNav";
import Footer from "../Footer/Footer";
import moderatorlogin from "../../assets/images/moderatorlogin.jpg";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axiosInstance from "../../apis/axiosInstance";
import UserNavbar from "../homeComponents/Navbar/UserNavbar";

function Moderatorlogin() {
  const[show,setShow]= useState(true)
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleShow = () =>
    {
      setShow(!show)
    }
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checkValidity()) {
      return;
    }

    sendDataToServer();
  };

  const sendDataToServer = async () => {
    try {
      const res = await axiosInstance.post("/loginModerator", data);
      console.log("res", res);
      if (res.data.status === 200) {
        const userId = res?.data?.data?._id || null;

        if (userId) {
          localStorage.setItem("trade-hub-modId", userId);
        }
        toast.success(res.data.msg);

        navigate("/moderator/home");
      } else if (res.data.status === 410 || res.data.status === 405) {
        toast.error(res.data.msg);
      } else {
        toast.error(res.data.msg);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <UserNavbar />
      <div className="mt-5 container">
        <div className="moderator-login-box mb-5">
          <div className="row">
            <div className="col">
              <img
                src={moderatorlogin}
                alt="img"
                className="moderator-login-img"
              ></img>
            </div>
            <div className="col">
              <div className="text-center mt-5">
                <h2>Moderator Login</h2>
              </div>
              <div>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label className="moderator-login mt-5 ms-5 ">Email</label>
                    <input
                      className="moderator-login-textbox ps-3"
                      type="email"
                      name="email"
                      value={data.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="d-flex">
                    <label className="moderator-login mt-4 ms-5">
                      Password
                    </label>
                    {/* <input
                      className="moderator-login-textbox ms-2"
                      type={show?"password":"text"}
                      name="password"
                      value={data.password}
                      onChange={handleChange}
                    /> */}
                    <InputGroup className="mod-login-password-box ms-2 ps-3 ">
                      <Form.Control
                        className="mod-login-password-inp"
                        type={show?"password":"text"}
                      name="password"
                      value={data.password}
                      onChange={handleChange}
                        aria-label="password"
                        placeholder="password"
                        aria-describedby="basic-addon1"
                      />
                      <InputGroup.Text
                        id="basic-addon1"
                        className="modlogin-eye-box"
                      >
                        {show ? (
                          <FaEyeSlash
                            className="modLogin-toggleEye"
                            onClick={handleShow}
                          />
                        ) : (
                          <FaRegEye
                            className="modLogin-toggleEye"
                            onClick={handleShow}
                          />
                        )}
                      </InputGroup.Text>
                    </InputGroup>
                  </div>
                  <div className="mt-3 moderator-login-link container">
                    <Link
                      to="/moderator/forget-password"
                      className="moderator-login-forget"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <button type="submit" className="moderator-login-btn mt-5">
                    Login
                  </button>
                  <div className="mt-4 ms-5">
                    <h6 className="text-center">
                      New to TradeHub?{" "}
                      <Link to="/moderator/register" className="">
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
      <Footer />
    </div>
  );
}

export default Moderatorlogin;

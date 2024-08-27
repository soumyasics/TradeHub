import React, { useState } from "react";
import "./Moderator.css";
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import { toast } from "react-hot-toast";
import { axiosMultipartInstance } from "../../apis/axiosMultipartInstance";
import UserNavbar from "../homeComponents/Navbar/UserNavbar";
import { onlyAlphabets } from "../../validation/validation";

function ModeratorRegister() {
  const navigate = useNavigate();
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(true);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    contact: "",
    password: "",
    gender: "",
    profile: null,
    repassword: "",
    address: "",
    checkbox: false,
  });

  const handleShow1 = () => {
    setShow1(!show1);
  };
  const handleShow2 = () => {
    setShow2(!show2);
  };

  const handleFileChange = (e) => {
    handleChange(e);
  };

  console.log("data => ", data);

  const handleChangeChecked = (e) => {
    data.checkbox = e.target.checked;
    console.log(e.target.checked);
    console.log(data);
  };
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setData((prevData) => ({
        ...prevData,
        [name]: e.target.checked,
      }));
    } else {

      if (name === "firstname" || name === "lastname") {
        if (!onlyAlphabets(value)){
          return;
        }
      }
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const checkValidity = () => {
    const {
      firstname,
      lastname,
      email,
      contact,
      password,
      repassword,
      checkbox,
      gender,
      address,
    } = data;
    if (!firstname) {
      toast.error("Please enter your first name");
      return false;
    }
    if (!lastname) {
      toast.error("Please enter your last name");
      return false;
    }
    if (!gender) {
      toast.error("Please select your gender");
      return false;
    }
    if (!email) {
      toast.error("Please enter your email");
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (!contact) {
      toast.error("Please enter your contact number");
      return false;
    }
    if (contact.length !== 10) {
      toast.error("Please enter a valid 10 digit contact number");
      return false;
    }
    if (!password) {
      toast.error("Please enter your password");
      return false;
    }
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must contain at least one number, one special character, and one capital letter"
      );

      return false;
    }

    if (!repassword) {
      toast.error("Please re-enter your password");
      return false;
    }
    if (password !== repassword) {
      toast.error("Passwords do not match");
      return false;
    }
    if (!address) {
      toast.error("Please enter your address");
      return false;
    }

    if (!data.profile) {
      toast.error("Please upload your profile picture");
      return false;
    }
    if (!checkbox) {
      toast.error("You must agree to the terms and conditions.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!checkValidity()) {
      return;
    }
    const formData = new FormData();
    formData.append("firstname", data.firstname);
    formData.append("lastname", data.lastname);
    formData.append("email", data.email);
    formData.append("contact", data.contact);
    formData.append("password", data.password);
    formData.append("gender", data.gender);
    formData.append("profile", data.profile);

    sendDataToServer(formData);
  };

  const sendDataToServer = async () => {
    try {
      const res = await axiosMultipartInstance.post("/registerModerator", data);
      console.log("user regsit", res);
      if (res.data.status === 200) {
        toast.success("Registration Successfull");
        navigate("/moderator/login");
      } else if (res.data.status === 400 || res.data.status === 409) {
        const msg = res.data?.msg || "Please check inputs";
        toast.error(`Registeration is failed : ${msg}`);
      } else {
        toast.error(`Registeration is failed : ${res.data.msg}`);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <UserNavbar />
      <div className="moderator-register-box container ">
        <div className="mb-5 ">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col container ">
                <div>
                  <label className="moderator-register-label mt-3">Name</label>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="moderator-register-textbox mt-2"
                    value={data.firstname}
                    name="firstname"
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="moderator-register-textbox mt-5"
                    value={data.lastname}
                    name="lastname"
                    onChange={handleChange}
                  />
                </div>
                <label className="moderator-register-label mt-5">Gender</label>
                <input
                  type="radio"
                  className="ms-5 moderator-register-radio"
                  name="gender"
                  value="male"
                  onChange={handleChange}
                  checked={data.gender === "male"}
                />
                <label className="user-register-label ms-2">Male</label>
                <input
                  type="radio"
                  className="ms-5 moderator-register-radio"
                  name="gender"
                  value="female"
                  onChange={handleChange}
                  checked={data.gender === "female"}
                />
                <label className="user-register-label ms-2">Female</label>
                <br></br>
                <div>
                  <label className="moderator-register-label mt-4">Email</label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="user-register-textbox mt-2"
                    value={data.email}
                    name="email"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="moderator-register-label mt-4">
                    Phone number
                  </label>
                  <input
                    type="text"
                    className="moderator-register-textbox mt-2"
                    value={data.contact}
                    name="contact"
                    onChange={handleChange}
                    placeholder="Phone number (10 Digits)"
                    maxLength="10"
                    minLength="10"
                    pattern="[0-9]{10}"
                  />
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input mt-5"
                    type="checkbox"
                    value={data.checkbox}
                    name="checkbox"
                    onChange={handleChangeChecked}
                    id="flexCheckChecked"
                  />
                  <label
                    className="form-check-label mt-5 label-moderator-register text-primary"
                    for="flexCheckChecked"
                    onClick={() => navigate("/user/terms-and-conditions")}
                  >
                    Agree to Terms and Condition
                  </label>
                  <br></br>
                </div>
              </div>
              <div className="col">
                <div>
                  <label className="moderator-register-label mt-3">
                    Password
                  </label>
                  {/* <input
                    type="password"
                    placeholder="Password"
                    className="moderator-register-textbox mt-2"
                    value={data.password}
                    name="password"
                    onChange={handleChange}
                  /> */}

                  <InputGroup className="mod-signup-password-box ">
                    <Form.Control
                      className="mod-signup-password-inp"
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
                      className="modsignup-eye-box"
                    >
                      {show1 ? (
                        <FaEyeSlash
                          className="modsignup-toggleEye"
                          onClick={handleShow1}
                        />
                      ) : (
                        <FaRegEye
                          className="modsignup-toggleEye"
                          onClick={handleShow1}
                        />
                      )}
                    </InputGroup.Text>
                  </InputGroup>
                </div>
                <div>
                  <label className="moderator-register-label mt-4">
                    Re-enter Password
                  </label>
                  {/* <input
                    type="password"
                    placeholder="Re-enter Password"
                    className="moderator-register-textbox mt-2"
                    value={data.repassword}
                    name="repassword"
                    onChange={handleChange}
                  /> */}

                  <InputGroup className="mod-signup-password-box ">
                    <Form.Control
                      className="mod-signup-password-inp"
                      type={show2 ? "password" : "text"}
                      placeholder="Re-enter Password"
                      value={data.repassword}
                      name="repassword"
                      onChange={handleChange}
                      aria-label="password"
                      aria-describedby="basic-addon1"
                    />
                    <InputGroup.Text
                      id="basic-addon1"
                      className="modsignup-eye-box"
                    >
                      {show2 ? (
                        <FaEyeSlash
                          className="modsignup-toggleEye"
                          onClick={handleShow2}
                        />
                      ) : (
                        <FaRegEye
                          className="modsignup-toggleEye"
                          onClick={handleShow2}
                        />
                      )}
                    </InputGroup.Text>
                  </InputGroup>
                </div>
                <div>
                  <label className="moderator-register-label mt-4">
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="Address"
                    className="moderator-register-textbox mt-2"
                    name="address"
                    value={data.address}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="moderator-register-label mt-4">
                    Profile Photo
                  </label>
                  <input
                    type="file"
                    className="moderator-register-textbox mt-2"
                    onChange={(event) => {
                      setData({
                        ...data,
                        profile: event.target.files[0],
                      });
                    }}
                    name="profile"
                  />
                </div>
              </div>

              <div className="text-center">
                <button type="submit" className="moderator-register-btn mt-4">
                  Register
                </button>
              </div>
              <div className="text-center mt-3">
                <label>Are you Existing User?</label>
                {/* <p className="moderator-register-link">
                </p> */}
                <span
                  className="fw-bold ms-1 text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/moderator/login");
                  }}
                >
                  {" "}
                  Login Now
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ModeratorRegister;

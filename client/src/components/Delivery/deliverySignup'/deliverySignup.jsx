import React, { useState } from "react";
import "./deliverySignup.css";
import MainNav from "../../homeComponents/Navbar/MainNav";
import { axiosMultipartInstance } from "../../../apis/axiosMultipartInstance";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function DeliveryAgentSignup() {
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
  const handlechange = (e) => {
    const { name, value, type } = e.target;
    if (type === "checkebox") {
      setData((prevData) => ({
        ...prevData,
        [name]: e.target.checked,
      }));
    } else {
      setData((prevData) => ({ ...prevData, [name]: value }));
    }
  };
  const handlechangeChecked = (e) => {
    data.checkbox = e.target.checked;
    console.log(e.target.checked);
    console.log(data);
  };

  const checkValidity = () => {
    const {
      firstname,
      lastname,
      email,
      password,
      repassword,
      checkbox,
      gender,
      address,
      contact,
    } = data;
    if (!firstname) {
      toast.error("Please enter your name");
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

  const handleSubmit =  (e) => {
    e.preventDefault();

    if (!checkValidity()) {
      return;
    }
  };
  return (
    <div>
      <div>
        <MainNav />
      </div>

      <div className="deliverysignup-box container ">
        <div className="mb-5 ">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col container ">
                <div>
                  <label className="deliverysignup-label mt-3">Name</label>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="deliverysignup-textbox mt-2"
                    name="firstname"
                    value={data.firstname}
                    onChange={handlechange}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="deliverysignup-textbox mt-5"
                    name="lastname"
                    value={data.secondname}
                    onChange={handlechange}
                  />
                </div>
                <label className="deliverysignup-label mt-5">Gender</label>
                <input
                  type="radio"
                  className="ms-5 deliverysignup-radio"
                  name="gender"
                  value="male"
                  onChange={handlechange}

                />
                <label className="user-register-label ms-2">Male</label>
                <input
                  type="radio"
                  className="ms-5 deliverysignup-radio"
                  name="gender"
                  value="female"
                  onChange={handlechange}

                />
                <label className="user-register-label ms-2">Female</label>
                <br></br>
                <div>
                  <label className="deliverysignup-label mt-4">Email</label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="user-register-textbox mt-2"
                    name="email"
                    onChange={handlechange}
                    value={data.email}

                  />
                </div>
                <div>
                  <label className="deliverysignup-label mt-4">
                    Phone number
                  </label>
                  <input
                    type="text"
                    placeholder="Phone number"
                    className="deliverysignup-textbox mt-2"
                    name="contact"
                    onChange={handlechange}
                    value={data.contact}
                  />
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input mt-5"
                    type="checkbox"
                    name="checkbox"
                    value={data.checkbox}

                    onChange={handlechangeChecked}
                  />
                  <label
                    className="form-check-label mt-5 label-deliverysignup"
                    for="flexCheckChecked"
                  >
                    Agree to Terms and Condition
                  </label>
                  <br></br>
                </div>
              </div>
              <div className="col">
                <div>
                  <label className="deliverysignup-label mt-3">Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    className="deliverysignup-textbox mt-2"
                    name="password"
                    onChange={handlechange}
                    value={data.password}
                  />
                </div>
                <div>
                  <label className="deliverysignup-label mt-4">
                    Re-enter Password
                  </label>
                  <input
                    type="password"
                    placeholder="Re-enter Password"
                    className="deliverysignup-textbox mt-2"
                    name="repassword"
                    onChange={handlechange}
                    value={data.repassword}
                  />
                </div>
                <div>
                  <label className="deliverysignup-label mt-4">Address</label>
                  <input
                    type="text"
                    placeholder="Address"
                    className="deliverysignup-textbox mt-2"
                    name="address"
                    onChange={handlechange}
                    value={data.address}
                  />
                </div>
                <div>
                  <label className="deliverysignup-label mt-4">
                    Profile Photo
                  </label>
                  <input
                    type="file"
                    className="deliverysignup-textbox mt-2"
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
                <button type="submit" className="deliverysignup-btn mt-4">
                  Register
                </button>
              </div>
              <div className="text-center mt-3">
                <label>Already registerd!</label>
                <Link to="/agentlogin" className="deliverysignup-link">
                  <span> Login</span>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DeliveryAgentSignup;

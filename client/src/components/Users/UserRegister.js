import React, { useState } from "react";
import userreg from "../../assets/images/userreg.png";
import userregimg from "../../assets/images/userregimg.png";
import MainNav from "../homeComponents/Navbar/MainNav";
import Footer from "../Footer/Footer";
import axiosMultipartInstance from "../../apis/axiosMultipartInstance";
import { Navigate, useNavigate } from "react-router-dom";
import { BiImageAdd } from "react-icons/bi";
import { FiEdit2 } from "react-icons/fi";

function UserRegister() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    contact: "",
    password: "",
    gender: "",
    profile: null,
    repassword: "",
    checkbox: false,
  });
  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    contact: "",
    password: "",
    gender: "",
    profile: null,
    repassword: "",
    checkbox: false,
  });
  let formIsValid = false;

  const [profileImage, setProfileImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === "file") {
      const file = files[0];
      setData((prevData) => ({
        ...prevData,
        [name]: file,
      }));
    } else if (type === "checkbox") {
      setData((prevData) => ({
        ...prevData,
        [name]: e.target.checked,
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  console.log(data);

  const handleChangeChecked = (e) => {
    data.checkbox = e.target.checked;
    console.log(e.target.checked);
    console.log(data);
    validateCheckbox(data);
  };
  const handleImageUpload = (e) => {
    setProfileImage(URL.createObjectURL(e.target.files[0]));
  };

  function validateField(fieldName, value) {
    if (!value.trim()) {
      return `${fieldName} is required`;
    }
    if (fieldName === "Email" && !value.endsWith("@gmail.com")) {
      return "Email must be a valid Gmail address";
    }
    return "";
  }
  function validateContact(fieldName, value) {
    if (!value.trim()) {
      return `${fieldName} is required`;
    } else if (value.length !== 10) {
      return "Please enter a valid Contact Number";
    }
    return "";
  }

  function validateImageField(files, value) {
    if (!value) {
      return `${files} is required.`;
    }
  }
  function validateCheckbox(value) {
    console.log(data.checkbox);
    if (!data.checkbox) {
      return "You must agree to the terms and conditions.";
      formIsValid = false;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = {};
    let formIsValid = true;

    errors.firstname = validateField("FirstName", data.firstname);
    errors.lastname = validateField("Lastname", data.lastname);
    errors.email = validateField("Email", data.email);
    errors.contact = validateContact("Phoneno", data.contact);
    errors.profile = validateImageField("Profile", data.profile);
    errors.checkbox = validateCheckbox("Checkbox", data.checkbox);

    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{6,}$/;
    if (!data.password.trim()) {
      formIsValid = false;
      errors.password = "Password is required";
    } else if (!passwordRegex.test(data.password)) {
      // Pass the password to the test method
      errors.password =
        "Password must contain at least one number, one special character, and one capital letter";
    }

    if (!data.repassword.trim()) {
      formIsValid = false;
      errors.repassword = "Confirm Password is required";
    } else if (data.repassword !== data.password) {
      formIsValid = false;
      errors.repassword = "Passwords do not match";
    }

    setErrors(errors);
    if (formIsValid) {
      console.log("data", data);
    }

    for (let key in errors) {
      if (errors[key]) {
        formIsValid = false;
        break;
      }
    }

    if (formIsValid) {
      const formData = new FormData();
      formData.append("firstname", data.firstname);
      formData.append("lastname", data.lastname);
      formData.append("email", data.email);
      formData.append("contact", data.contact);
      formData.append("file", data.profile);
      formData.append("password", data.password);
      formData.append("gender", data.gender);

      try {
        const res = await axiosMultipartInstance.post("/registerUser", data);
        console.log(res);
        if (res.data.status === 200) {
          alert("Register SuccessFully");
          navigate("/user/login");
        } else {
          alert(`Registeration is failed : ${res.data.msg}`);
        }
      } catch (error) {
        console.error("There was an error!", error);
        alert("Error");
      }
    }
  };

  const handleFileChange = (e) => {
    handleChange(e);
    handleImageUpload(e);
  };

  return (
    <div>
      <MainNav />
      <div className="user-register-box container mb-5 mt-4 pb-5">
        <div className="row">
          <div className="col-5">
            <img className="user-register-img" src={userreg} alt="img"></img>
          </div>
          <div className="col-7">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col container ">
                  <div>
                    <label className="user-register-label mt-3">Name</label>
                    <input
                      type="text"
                      placeholder="First Name"
                      className="user-register-textbox mt-2"
                      value={data.firstname}
                      name="firstname"
                      onChange={handleChange}
                    ></input>
                    {errors.firstname && (
                      <span className="text-danger">{errors.firstname}</span>
                    )}
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="user-register-textbox mt-5"
                      value={data.lastname}
                      name="lastname"
                      onChange={handleChange}
                    ></input>
                    {errors.lastname && (
                      <span className="text-danger">{errors.lastname}</span>
                    )}
                  </div>
                  <label className="user-register-label mt-5">Gender</label>
                  <input
                    type="radio"
                    className="ms-5"
                    id="user-register-radio"
                    name="gender"
                    onChange={handleChange}
                    value="male"
                    checked={data.gender === "male"}
                  ></input>
                  <label className="user-register-label ms-2">Male</label>
                  <input
                    type="radio"
                    className="ms-5"
                    id="user-register-radio"
                    name="gender"
                    onChange={handleChange}
                    value="female"
                    checked={data.gender === "female"}
                  ></input>
                  <label className="user-register-label ms-2">Female</label>
                  <br></br>
                  <div>
                    <label className="user-register-label mt-4">Email</label>
                    <input
                      type="email"
                      placeholder="Email"
                      className="user-register-textbox mt-2"
                      value={data.email}
                      name="email"
                      onChange={handleChange}
                    ></input>
                    {errors.email && (
                      <span className="text-danger">{errors.email}</span>
                    )}
                  </div>
                  <div>
                    <label className="user-register-label mt-4">
                      Phone number
                    </label>
                    <input
                      type="text"
                      placeholder="Phone number"
                      className="user-register-textbox mt-2"
                      value={data.contact}
                      name="contact"
                      onChange={handleChange}
                    ></input>
                    {errors.contact && (
                      <span className="text-danger">{errors.contact}</span>
                    )}
                  </div>
                </div>
                <div className="col">
                  <div className="user-register-icon">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="profile"
                        className="rounded-circle"
                        width="200"
                        height="200"
                      />
                    ) : (
                      <BiImageAdd
                        size={190}
                        color="grey"
                        className="rounded-circle p-3"
                      />
                    )}
                    <label className="upload-icon">
                      <FiEdit2 className="" color="grey" />
                      <input
                        type="file"
                        style={{ display: "none" }}
                        name="profile"
                        onChange={handleFileChange}
                        className={errors.profile ? "is-valid" : ""}
                      />
                      {errors.profile && (
                        <span className="text-danger">{errors.profile}</span>
                      )}
                    </label>
                  </div>
                  <div>
                    <label className="user-register-label mt-3">Password</label>
                    <input
                      type="password"
                      placeholder="Password"
                      className="user-register-textbox mt-2"
                      value={data.password}
                      name="password"
                      onChange={handleChange}
                    ></input>
                    {errors.password && (
                      <span className="text-danger">{errors.password}</span>
                    )}
                  </div>
                  <div>
                    <label className="user-register-label mt-4">
                      Re-enter Password
                    </label>
                    <input
                      type="password"
                      placeholder="Re-enter Password"
                      className="user-register-textbox mt-2"
                      value={data.repassword}
                      name="repassword"
                      onChange={handleChange}
                    ></input>
                    {errors.password && (
                      <span className="text-danger">{errors.password}</span>
                    )}
                  </div>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input mt-5"
                    type="checkbox"
                    value={data.checkbox}
                    name="checkbox"
                    onChange={handleChangeChecked}
                    id="flexCheckChecked"
                  />
                  <label
                    class="form-check-label mt-5 label-user-register"
                    for="flexCheckChecked"
                  >
                    Agree to Terms and Condition
                  </label>
                  <br></br>
                  {errors.checkbox && (
                    <span className="text-danger">{errors.checkbox}</span>
                  )}
                </div>

                <div className="text-center">
                  <button type="submit" className="user-register-btn mt-4">
                    Register
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UserRegister;

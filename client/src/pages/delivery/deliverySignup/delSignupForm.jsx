import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./delSignupForm.css";
const DelSignupForm = ({ signupBtnClicked, clickSignupBtn }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
    gender: "",
    age: "",
    phoneNumber: "",
    address: "",
    img: null,
  });
  const [validated, setValidated] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleFilechange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.files[0] });
  };
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // form validation
  const handleSubmit = (event) => {
    event.preventDefault();
    clickSignupBtn();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    if (
      !userData.fullName ||
      !userData.email ||
      !userData.password ||
      !userData.gender ||
      !userData.age ||
      !userData.phoneNumber ||
      !userData.address
    ) {
      console.log("Please fill all the fields");
      return;
    } else {
      if (!agreedToTerms) {
        console.log("Not checked");
        return;
      }
      if (userData.phoneNumber.length !== 10) {
        console.log("Phone number must be 10 digits");
        return;
      }
      if (!isValidEmail(userData.email)) {
        console.log("Invalid email");
        return;
      }

      sendDataToServer(userData);
    }
  };

  const handleCheckboxChange = (e) => {
    setAgreedToTerms(e.target.checked);
  };

  const redirectLogin = () => {
    navigate("/user/login");
  };
  const sendDataToServer = async (data) => {
    console.log("send data to server");
    // try {
    //   const response = await axiosMultipartInstance.post("/user/signup", data);
    //   if (response.status === 201) {
    //     console.log("user created successfully");
    //     alert("Registration successful.");
    //     setTimeout(() => {
    //       navigate("/user/login");
    //     }, 1500);
    //   }
    // } catch (error) {
    //   console.log(error);
    //   if (error.response?.status === 400) {
    //     alert(error.response.data.message);
    //   }else {
    //     alert(error.message)
    //   }
    // }
  };
  return (
    <Form
      id="user-signup-form-input"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    
    >
      <div className="signup-form-flex-div">
        <Form.Group>
          <Form.Control
            required
            type="text"
            placeholder="Full name"
            name="fullName"
            onChange={handleChange}
            value={userData.fullName}
          />
          <Form.Control.Feedback type="invalid">
            Please enter your full name!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Control
            onChange={handleChange}
            name="age"
            value={userData.age}
            type="number"
            placeholder="Your age"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please Enter your age
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      <div className="signup-form-flex-div">
        <Form.Group>
          <Form.Control
            required
            as="select"
            type="select"
            name="gender"
            onChange={handleChange}
            value={userData.gender}
          >
            <option value="">Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            Please select your gender.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Control
            required
            type="text"
            minLength={10}
            maxLength={10}
            placeholder="Phone Number"
            name="phoneNumber"
            onChange={handleChange}
            value={userData.phoneNumber}
            pattern="[0-9]{10}"
          />
          <Form.Control.Feedback type="invalid">
            Please Enter 10 digits phone Number.
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      <div className="signup-form-flex-div">
        <Form.Group>
          <Form.Control
            required
            type="email"
            placeholder="Email"
            value={userData.email}
            name="email"
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please Enter valid email.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Control
            required
            type="password"
            minLength={8}
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={userData.password}
          />
          <Form.Control.Feedback type="invalid">
            Please Enter atleast 8 characters.
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      <div className="signup-form-flex-div">
        <Form.Group>
          <Form.Control
            name="address"
            onChange={handleChange}
            value={userData.address}
            type="text"
            placeholder="Address"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a your address.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Control
            name="address"
            onChange={handleChange}
            value={userData.address}
            type="text"
            placeholder="Address"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a your address.
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      <Form.Group className="position-relative mt-3">
        <Form.Label>Upload your photo</Form.Label>
        <Form.Control
          onChange={handleFilechange}
          type="file"
          name="img"
          accept="image/*"
        />
      </Form.Group>
      <div className="signup-form-flex-div">
        <Form.Group className="mt-3">
          <Form.Check
            required
            className="signup-check-box"
            label="Agree to our terms and conditions"
            feedbackType="invalid"
            checked={agreedToTerms}
            onChange={handleCheckboxChange}
          />
        </Form.Group>

        <p className="mt-3">
          {" "}
          Already have an account?{" "}
          <span className="redirect-login" onClick={redirectLogin}>
            Login
          </span>{" "}
        </p>
      </div>

      <div className={`center ${!signupBtnClicked && 'mt-4'}`}>
        <Button id="user-signup-btn" type="submit">
          Sign UP
        </Button>
      </div>
    </Form>
  );
};
export default DelSignupForm;

import React, { useState } from "react";
import "./deliveryforgotpassword.css";
import img1 from "../../../assets/images/passwordImg.png";
import MainNav from "../../homeComponents/Navbar/MainNav";
import Footer from "../../Footer/Footer";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function Deliveryforgotpassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmpassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (!password) {
      toast.error("password is required");
      return;
    }
    if (password.length < 8) {
      toast("Password needs minimum 8 characters");
      return;
    }
    if (!confirmPassword) {
      toast.error("confirm password is required");
      return;
    }
    if (password !== confirmPassword) {
      alert.error("password doesn't matches");
      return;
    }
    sendToServer({email})
  };

  return (
    <div>
      <div>
        <MainNav />
      </div>
      <div className="mb-5 container">
        <div className="deliveryagent-forgot-box ">
          <div className="row">
            <div className="col">
              <img
                src={img1}
                alt="img"
                className="deliveryagent-forgot-img"
              ></img>
            </div>
            <form className="col" onSubmit={handleSubmit}>
              <div className="container mt-5 text-center">
                <h2>Forget Password</h2>
              </div>
              <div>
                <div>
                  <div>
                    <input
                      type="email"
                      className="deliveryagent-forgot-textbox mt-5"
                      placeholder="Enter email"
                      name="email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      className="deliveryagent-forgot-textbox mt-5"
                      placeholder="Enter new Password"
                      name="password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div>
                  <input
                    type="password"
                    className="deliveryagent-forgot-textbox mt-5"
                    placeholder="Re-Enter new Password"
                    name="confirmpassword"
                    onChange={(e) => {
                      setConfirmpassword(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="text-center">
                <button type="submit" className="deliveryagent-forgot-btn mt-5">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Deliveryforgotpassword;

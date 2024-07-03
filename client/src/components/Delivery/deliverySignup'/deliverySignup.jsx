import React from "react";
import "./deliverySignup.css";

function DeliveryAgentSignup() {
  return (
    <div>
      <div className="deliverysignup-box container ">
        <div className="mb-5 ">
          <form>
            <div className="row">
              <div className="col container ">
                <div>
                  <label className="deliverysignup-label mt-3">Name</label>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="deliverysignup-textbox mt-2"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="deliverysignup-textbox mt-5"
                  />
                </div>
                <label className="deliverysignup-label mt-5">Gender</label>
                <input
                  type="radio"
                  className="ms-5 deliverysignup-radio"
                  name="gender"
                />
                <label className="user-register-label ms-2">Male</label>
                <input
                  type="radio"
                  className="ms-5 deliverysignup-radio"
                  name="gender"
                />
                <label className="user-register-label ms-2">Female</label>
                <br></br>
                <div>
                  <label className="deliverysignup-label mt-4">Email</label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="user-register-textbox mt-2"
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
                  />
                </div>
                <div className="form-check">
                  <input className="form-check-input mt-5" type="checkbox" />
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
                  <label className="deliverysignup-label mt-3">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    className="deliverysignup-textbox mt-2"
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
                  />
                </div>
                <div>
                  <label className="deliverysignup-label mt-4">
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="Address"
                    className="deliverysignup-textbox mt-2"
                  />
                </div>
                <div>
                  <label className="deliverysignup-label mt-4">
                    Profile Photo
                  </label>
                  <input
                    type="file"
                    className="deliverysignup-textbox mt-2"
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
                <a className="deliverysignup-link">
                  <span> Login</span>
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DeliveryAgentSignup;

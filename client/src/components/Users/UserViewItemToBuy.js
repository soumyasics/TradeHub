import React from "react";
import "./User.css";
import UserMainNav from "./UserMainNav";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import airpods from "../../assets/images/airpods.png";
import airpods1 from "../../assets/images/airpods1.png";
import airpods2 from "../../assets/images/airpods2.png";
import airpods3 from "../../assets/images/airpods3.png";
import Footer from "../Footer/Footer";

function UserViewItemToBuy() {
  return (
    <div>
      <UserMainNav />
      <div className="mb-5">
        <div className="ms-5 mt-5">
          <Link
            to="/user/additemtosell"
            className="userview-itemtobuy-color-link"
          >
            <FaArrowLeft />
          </Link>
        </div>
        <div className="container">
          <div className="row container">
            <div className="col-md-5 col-sm-12 container">
              <img
                src={airpods}
                alt="img"
                className="userview-itemtobuy-airpods"
              ></img>
              <div className="row container mt-5">
                <div className="col-md-4 col-sm-12">
                  <img
                    src={airpods1}
                    alt="img"
                    className="userview-itemtobuy-airpods1"
                  ></img>
                </div>
                <div className="col-md-4 col-sm-12">
                  <img
                    src={airpods2}
                    alt="img"
                    className="userview-itemtobuy-airpods1"
                  ></img>
                </div>
                <div className="col-md-4 col-sm-12">
                  <img
                    src={airpods3}
                    alt="img"
                    className="userview-itemtobuy-airpods1"
                  ></img>
                </div>
              </div>
            </div>
            <div className="col-md-7 col-sm-12 container">
              <div className="container mt-3 ms-5">
                <h5 className="container userview-itemtobuy-h5">Electronics</h5>
              </div>
              <div className="container mt-3 ms-5">
                <h1 className="container userview-itemtobuy-h5">Airpods</h1>
              </div>
              <div className="container mt-3 ms-5">
                <div className="row">
                  <div className="col-3 ms-3 mt-4 ">
                    <label className="userview-itemtobuy-label">Quantity</label>{" "}
                    <input
                      type="text"
                      className=" mt-3 userview-itemtobuy-textbox text-center"
                      value={1}
                    />
                  </div>
                  <div className="col-3 ms-3 mt-4 ">
                    <label className="userview-itemtobuy-label">
                      Condition
                    </label>
                    <label className="userview-itemtobuy-label1 mt-4">
                      No damage
                    </label>
                  </div>
                  <div className="col-6"></div>
                </div>
              </div>
              <div className="container mt-5 ms-5">
                <div className="row mt-5">
                  <div className="col-3 ">
                    <label className="userview-itemtobuy-label ms-2">
                      Description
                    </label>
                  </div>
                  <div className="col-1">
                    <label> : </label>
                  </div>
                  <div className="col-8">
                    <span className="userview-itemtobuy-label">
                      {" "}
                      Airpods with 35 hrs Playback,13mm Drivess, bluetooth
                      headset.{" "}
                    </span>
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="col-3">
                    <label className="userview-itemtobuy-label ms-2">
                      Address
                    </label>
                  </div>
                  <div className="col-1">
                    <label> : </label>
                  </div>
                  <div className="col-8">
                    <span className="userview-itemtobuy-label">
                      kazhakootam,trivandrum, kerala, 695022.{" "}
                    </span>
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="col-3">
                    <label className="userview-itemtobuy-label ms-2">
                      Location
                    </label>
                  </div>
                  <div className="col-1">
                    <label> : </label>
                  </div>
                  <div className="col-8">
                    <span className="userview-itemtobuy-label">
                      kazhakootam
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-center mt-5">
                <button
                  type="submit"
                  className="userview-itemtobuy-exchangebtn"
                >
                  Exchange Now
                </button>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <Footer />
    </div>
  );
}

export default UserViewItemToBuy;

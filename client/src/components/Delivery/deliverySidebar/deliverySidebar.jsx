import React, { useEffect } from "react";
import "../delivery.css";
import { useState } from "react";
import deliveryImg from "../../../assets/images/adminsidebarimg.png";
import { RxDashboard } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { MdLogout } from "react-icons/md";
import { DeliveryProfile } from "../deliveryProfile/deliveryProfile";
import { CiDeliveryTruck } from "react-icons/ci";
import { MdOutlinePendingActions } from "react-icons/md";
import { TiDropbox } from "react-icons/ti";
import { LiaDropbox } from "react-icons/lia";
import { BsBoxArrowInRight } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
export const DeliveryAgentSidebar = ({ changeSelectedPage }) => {
  const [dropdownDA, setdropdownDA] = useState(false);
  const [dropdownMod, setdropdownMod] = useState(false);
  const [dropDownOrders, setdropDownOrders] = useState(false);

  const navigate = useNavigate();
  const handleDeliveryLogout = () => {
    if (localStorage.getItem("trade-hub-DAId")) {
      localStorage.removeItem("trade-hub-DAId");
    }
    navigate("/delivery/login");
  };

  useEffect(() => {
    let isUserLoggedin = localStorage.getItem("trade-hub-DAId") || null;
    if (!isUserLoggedin) {
      navigate("/delivery/login");
    }
  }, [])
  const toggleDA = () => {
    setdropdownMod(false);
    setdropdownDA(!dropdownDA);
  };

  const toggleMod = () => {
    setdropdownDA(false);
    setdropdownMod(!dropdownMod);
  };
  const toggleOrders = () => {
    setdropDownOrders(!dropDownOrders);
  };

  return (
    <div>
      <div style={{ height: "120vh" }} className="admin-sidebar-color2">
        <div className="admin-sidebar-logotext d-flex  align-items-center">
          <img
            className="admin-sidebar-img"
            src={deliveryImg}
            style={{ width: "30px", height: "30px" }}
            alt="img"
            onClick={() => {
              changeSelectedPage("profile");
            }}
          ></img>
          &nbsp; &nbsp;
          <div
            className="mt-3"
            onClick={() => {
              changeSelectedPage("profile");
            }}
          >
            Delivery Agent
          </div>
          <FaRegBell className="delivery-sidebar-notification" />
        </div>
        <div className="mt-4">
          <ol className="admin-sidebar-list" style={{ fontSize: "14px" }}>
            <li onClick={() => changeSelectedPage("overview")}>
              <RxDashboard className="delivery-sidebar-icon" /> Dashboard
            </li>
            {/* <li onClick={() => changeSelectedPage("MyDeliveries")}>
              <LiaDropbox className="delivery-sidebar-icon" />
              My deliveries
            </li> */}
            <li onClick={() => changeSelectedPage("deliveryRequest")}>
              <CiDeliveryTruck className="delivery-sidebar-icon" /> Delivery
              request
            </li>
            <li
              onClick={() => {
                changeSelectedPage("deliveryPending");
              }}
            >
              <MdOutlinePendingActions className="delivery-sidebar-icon" />{" "}
              Delivery pending
            </li>
            <li
              onClick={() => {
                changeSelectedPage("view-users");
              }}
            >
              <FaUsers className="delivery-sidebar-icon" />{" "}
              View Users
            </li>

            <li onClick={toggleOrders}>
              <TiDropbox className="delivery-sidebar-icon" /> {" "}
              Orders
              {dropDownOrders && (
                <div
                  style={{ fontSize: "12px" }}
                  className="ps-3 bg-light dd-container "
                >
                  <li
                    className="text-dark admin-dd-item"
                    onClick={() => {
                      changeSelectedPage("acceptedOrders");
                    }}
                  >
                    {" "}
                    Accepted orders{" "}
                  </li>
                  <li
                    className="text-dark admin-dd-item mt-1"
                    onClick={() => {
                      changeSelectedPage("rejectedOrders");
                    }}
                  >
                    {" "}
                    Rejected orders{" "}
                  </li>
                </div>
              )}
            </li>
            <li
              onClick={() => {
                changeSelectedPage("deliveredOrders");
              }}
            >
              <BsBoxArrowInRight className="delivery-sidebar-icon" /> {" "}
              Delivered orders
            </li>

            <li onClick={handleDeliveryLogout} className="text-danger fw-bold ">
              <MdLogout />
              <span className="shadow ms-1">Logout</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

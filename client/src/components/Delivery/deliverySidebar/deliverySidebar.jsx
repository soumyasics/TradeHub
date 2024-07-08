import React from "react";
import "../delivery.css";
import { useState } from "react";
import deliveryImg from "../../../assets/images/adminsidebarimg.png";
import { RxDashboard } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { MdLogout } from "react-icons/md";
export const DeliveryAgentSidebar = ({ changeSelectedPage }) => {
  const [dropdownDA, setdropdownDA] = useState(false);
  const [dropdownMod, setdropdownMod] = useState(false);

  const navigate = useNavigate();
  const handleDeliveryLogout = () => {
    toast.success("Logout Successfully");
    navigate("/delivery/login");
  };
  const toggleDA = () => {
    setdropdownMod(false);
    setdropdownDA(!dropdownDA);
  };

  const toggleMod = () => {
    setdropdownDA(false);
    setdropdownMod(!dropdownMod);
  };

  return (
    <div>
      <div className="admin-sidebar-color2">
        <div className="admin-sidebar-logotext d-flex  align-items-center">
          <img
            className="admin-sidebar-img"
            src={deliveryImg}
            style={{ width: "30px", height: "30px" }}
            alt="img"
          ></img>
          &nbsp; &nbsp;
          <div className="mt-3">Delivery Agent</div>
        </div>
        <div className="mt-4">
          <ol className="admin-sidebar-list" style={{ fontSize: "14px" }}>
            <li onClick={() => changeSelectedPage("overview")}>
              <RxDashboard /> Overview
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

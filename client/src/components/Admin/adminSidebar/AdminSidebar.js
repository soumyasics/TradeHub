import React from "react";
import "../Admin.css";
import { useState } from "react";
import adminsidebarimg from "../../../assets/images/adminsidebarimg.png";
import { RxDashboard } from "react-icons/rx";
import { MdPeopleAlt } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { TbTrolley } from "react-icons/tb";
import { MdAddModerator } from "react-icons/md";
import { AiFillInteraction } from "react-icons/ai";
import { TbNotes } from "react-icons/tb";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
export const AdminSidebar = ({ changeSelectedPage }) => {
  const [dropdownDA, setdropdownDA] = useState(false);

  const navigate = useNavigate();
  const handleAdminLogout = () => {
    toast.success("Admin Logout Successfully");
    navigate("/admin/login");
  };
  const toggleDA = () => {
    setdropdownDA(!dropdownDA);
  };
  return (
    <div>
      <div className="admin-sidebar-color2">
        <div className="admin-sidebar-logotext d-flex  align-items-center">
          <img
            className="admin-sidebar-img"
            src={adminsidebarimg}
            style={{ width: "30px", height: "30px" }}
            alt="img"
          ></img>
          &nbsp; &nbsp;
          <div className="mt-3">Admin </div>
        </div>
        <div className="mt-4">
          <ol className="admin-sidebar-list" style={{ fontSize: "14px" }}>
            <li onClick={() => changeSelectedPage("overview")}>
              <RxDashboard /> Overview
            </li>
            <li onClick={() => changeSelectedPage("view-all-user")}>
              <MdPeopleAlt /> View User
            </li>
            <li>
              <GiReceiveMoney /> Transaction
            </li>
            <li onClick={toggleDA}>
              <TbTrolley /> Delivery Agent
              {dropdownDA && (
                <div style={{ fontSize: "12px" }} className="ps-3 bg-light dd-container ">
                  <li className="text-dark admin-dd-item" onClick={() => {
                    changeSelectedPage("view-pending-DA")
                  }}> Delivery agent request</li>
                  <li className="text-dark admin-dd-item" onClick={() => {
                    changeSelectedPage("view-active-DA")
                  }}> View all delivery agent </li>
                  <li className="text-dark admin-dd-item" onClick={() => {}}> View all delivery details </li>
                </div>
              )}
            </li>

            <li onClick={() => changeSelectedPage("view-moderators")}>
              <MdAddModerator /> Moderator
            </li>
            <li>
              <AiFillInteraction /> Interaction
            </li>
            <li>
              <TbNotes /> Guidelines
            </li>
            <li onClick={handleAdminLogout} className="text-danger fw-bold ">
              <MdLogout />
              <span className="shadow ms-1">Logout</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

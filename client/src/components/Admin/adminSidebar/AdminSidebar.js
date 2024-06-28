import React from "react";
import "../Admin.css";
import adminsidebarimg from "../../../assets/images/adminsidebarimg.png";
import { RxDashboard } from "react-icons/rx";
import { MdPeopleAlt } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { TbTrolley } from "react-icons/tb";
import { MdAddModerator } from "react-icons/md";
import { AiFillInteraction } from "react-icons/ai";
import { TbNotes } from "react-icons/tb";
import { MdLogout } from "react-icons/md";

export const AdminSidebar = ({ changeSelectedPage }) => {
  return (
    <div>
      <div className="admin-sidebar-color">
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
            <li>
              <TbTrolley /> Delivery Agent
            </li>
            <li>
              <MdAddModerator /> Moderator
            </li>
            <li>
              <AiFillInteraction /> Interaction
            </li>
            <li>
              <TbNotes /> Guidelines
            </li>
            <li>
              <MdLogout /> Logout
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

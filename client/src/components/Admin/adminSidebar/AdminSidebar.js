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
import { IoLogoWebComponent } from "react-icons/io5";
import { FaCloudUploadAlt } from "react-icons/fa";
export const AdminSidebar = ({ changeSelectedPage }) => {
  const [dropdownDA, setdropdownDA] = useState(false);
  const [dropdownMod, setdropdownMod] = useState(false);
  const [dropdownGuide, setdropdownGuide] = useState(false);

  const navigate = useNavigate();
  const handleAdminLogout = () => {
    toast.success("Admin Logout Successfully");
    navigate("/admin/login");
  };
  const toggleDA = () => {
    setdropdownMod(false);
    setdropdownDA(!dropdownDA);
    setdropdownGuide(false);
  };

  const toggleMod = () => {
    setdropdownDA(false);
    setdropdownGuide(false);
    setdropdownMod(!dropdownMod);
  };

  const toggleGuide = () => {
    setdropdownDA(false);
    setdropdownMod(false);
    setdropdownGuide(!dropdownGuide);
  };

  return (
    <div className="admin-sidebar-color3">
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
          {/* transaction error */}
          {/* <li onClick={() => changeSelectedPage("transaction")}>
            <GiReceiveMoney /> Transaction
          </li> */}
          <li onClick={toggleDA}>
            <TbTrolley /> Delivery Agent
            {dropdownDA && (
              <div
                style={{ fontSize: "12px" }}
                className="ps-3 bg-light dd-container "
              >
                <li
                  className="text-dark admin-dd-item"
                  onClick={() => {
                    changeSelectedPage("view-pending-DA");
                  }}
                >
                  {" "}
                  Delivery agent request
                </li>
                <li
                  className="text-dark admin-dd-item "
                  onClick={() => {
                    changeSelectedPage("view-active-DA");
                  }}
                >
                  {" "}
                  View all delivery agent{" "}
                </li>
                {/* <li
                  className="text-dark admin-dd-item "
                  onClick={() => {
                    changeSelectedPage("ExchangeItems");
                  }}
                >
                  {" "}
                  Exchange items{" "}
                </li> */}
              </div>
            )}
          </li>
          <li onClick={toggleMod}>
            <MdAddModerator /> Moderator
            {dropdownMod && (
              <div
                style={{ fontSize: "12px" }}
                className="ps-3 bg-light dd-container "
              >
                <li
                  className="text-dark admin-dd-item"
                  onClick={() => {
                    changeSelectedPage("view-pending-mod");
                  }}
                >
                  {" "}
                  Moderator requests
                </li>
                <li
                  className="text-dark admin-dd-item"
                  onClick={() => {
                    changeSelectedPage("view-active-mod");
                  }}
                >
                  {" "}
                  View active{" "}
                </li>
              </div>
            )}
          </li>

          {/* <li>
              <AiFillInteraction /> Interaction
            </li> */}
          <li onClick={toggleGuide}>
            <TbNotes /> Guidelines
            {dropdownGuide && (
              <div
                style={{ fontSize: "12px" }}
                className="ps-3 bg-light dd-container "
              >
                <li
                  className="text-dark admin-dd-item"
                  onClick={() => {
                    changeSelectedPage("adminGuideline");
                  }}
                >
                  {" "}
                  All Guidelines
                </li>
                <li
                  className="text-dark admin-dd-item"
                  onClick={() => {
                    changeSelectedPage("adminViewGuideline");
                  }}
                >
                  {" "}
                  View Guidelines{" "}
                </li>
              </div>
            )}
          </li>

          <li onClick={() => changeSelectedPage("webinar")}>
            <IoLogoWebComponent style={{ marginRight: "9px" }} />
            Webinar
          </li>

          <li onClick={() => changeSelectedPage("uploadTutorial")}>
            <FaCloudUploadAlt style={{ marginRight: "9px" }} />
            Upload Tutorial
          </li>
          <li onClick={handleAdminLogout} className="text-danger fw-bold ">
            <MdLogout />
            <span className="shadow ms-1">Logout</span>
          </li>
        </ol>
      </div>
    </div>
  );
};

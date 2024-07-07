import React from "react";
import "./moderatorSidebar.css";
import moderatorsidebarimg from "../../../assets/images/adminsidebarimg.png";
import { IoIosNotificationsOutline } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { BsBox } from "react-icons/bs";
import { PiShootingStarThin } from "react-icons/pi";
import { FaUsers } from "react-icons/fa6";
import { GiCardExchange } from "react-icons/gi";
import { MdLogout } from "react-icons/md";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
function ModeratorSidebar({ changeSelectedPage }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    return navigate("/moderator/login");
  };
  return (
    <div>
      <div className="moderator-sidebar-color">
        <div
          className="text-light fs-5 text-left ms-4 pt-3"
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/moderator/home");
          }}
        >
          <IoChevronBackSharp /> &nbsp;
        </div>
        <div className="moderator-sidebar-logotext d-flex  align-items-center">
          <img
            className="moderator-sidebar-img"
            src={moderatorsidebarimg}
            style={{ width: "30px", height: "30px" }}
            alt="img"
          ></img>
          &nbsp; &nbsp;
          <div className="mt-3">Moderator </div>
          {/* <div className="notifiactionIcon">
            <IoIosNotificationsOutline />
          </div> */}
        </div>
        <div className="mt-4">
          <ol className="moderator-sidebar-list" style={{ fontSize: "14px" }}>
            <li onClick={() => changeSelectedPage("overview")}>
              <span className="contentIcons">
                <RxDashboard />
              </span>
              Dashboard
            </li>
            <li onClick={() => changeSelectedPage("pending-items")}>
              <span className="contentIcons">
                <BsBox />
              </span>
              Items
            </li>
            <li>
              <span className="contentIcons">
                <PiShootingStarThin />
              </span>
              <p class="d-inline-flex gap-1">
                <button
                  class="reviewbtn"
                  data-bs-toggle="collapse"
                  href="#collapseExample"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  Item review
                </button>
              </p>
              <div class="collapse collapse-drop" id="collapseExample">
                <div class="card card-body">
                  <span className="collapse-dropbody">
                    <li>Approved items</li>
                    <li>Rejected items</li>
                  </span>
                </div>
              </div>
            </li>
            <li onClick={() => changeSelectedPage("view-users")}>
              <span className="contentIcons">
                <FaUsers />
              </span>
              Users
            </li>
            <li>
              <span className="contentIcons">
                <GiCardExchange />
              </span>
              Exchanged Items
            </li>
            <li onClick={handleLogout} className="text-danger fw-bold ">
              <span className="contentIcons">
                <MdLogout />
              </span>
              <span className="ms-1">Logout</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default ModeratorSidebar;

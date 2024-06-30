import React from "react";
import "./adminNavbar.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logos from "../../././../assets/images/logo.png";
import { Link } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
// import { Link } from 'react-router-dom';
import { GrUserAdmin } from "react-icons/gr";

export const AdminNavbar = () => {
  return (
    <div>
      <div className="nav-page-color">
        <Navbar collapseOnSelect expand="lg" className="" id="navfixed">
          <div className="col-10">
            <Navbar.Brand href="/tradehub" className="toggleimg">
              <img src={logos} className="logoimg ms-3" alt="img"></img>
              <span className="nav-page-trade">trade</span>{" "}
              <span className="nav-page-hub">hub</span>
            </Navbar.Brand>
          </div>
          <div className="col-2 ">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav d-flex align-items-center">
              <GrUserAdmin style={{ color: "white", fontSize: "18px" }} />
              <h6 className="ms-2 text-light m-0 ">Admin</h6>
            </Navbar.Collapse>
          </div>
        </Navbar>
      </div>
    </div>
  );
};

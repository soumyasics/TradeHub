import React from "react";
import "./MainNav.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logos from "../../././../assets/images/logo.png";
import { Link } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
// import { Link } from 'react-router-dom';

function MainNav() {
  return (
    <div>
      <div className="nav-page-color">
        <Navbar collapseOnSelect expand="lg" className="" id="navfixed">
          <div className="col-7">
            <Navbar.Brand href="/" className="toggleimg">
              <img src={logos} className="logoimg ms-3" alt="img"></img>
              <span className="nav-page-trade">trade</span>{" "}
              <span className="nav-page-hub">hub</span>
            </Navbar.Brand>
          </div>
          <div className="col-5 ">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav
                className="me-auto w-100 d-flex justify-content-end pe-5 gap-5 align-items-center"
              >
                <h6 className="nav-about">Home</h6>
                {/* <a href="#home" className="navlink ms-5 me-5  text-decoration-none">
              </a> */}
                <h6 className="nav-about">About</h6>
                {/* <a href="#about " className="navlink ms-5 me-5 text-decoration-none">
              </a> */}
                <Dropdown>
                  <Dropdown.Toggle id="nav-button" className="">
                    Login
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Link
                      class="dropdown-item"
                      to="/adminlogin"
                      id="landing-drop-link"
                    >
                      Admin
                    </Link>
                    <Link
                      class="dropdown-item"
                      to="/moderator/login"
                      id="landing-drop-link"
                    >
                      Moderator
                    </Link>
                    <Link
                      class="dropdown-item"
                      to="/user/login"
                      id="landing-drop-link"
                    >
                      User
                    </Link>
                    <Link
                      class="dropdown-item"
                      to="/delivery/login"
                      id="landing-drop-link"
                    >
                      Delivery Agent
                    </Link>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Navbar>
      </div>
    </div>
  );
}

export default MainNav;

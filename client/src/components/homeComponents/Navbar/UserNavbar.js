import React from "react";
import "./MainNav.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logos from "../../././../assets/images/logo.png";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function UserNavbar({ goToAboutSection = null}) {
  const navigate = useNavigate();
  const navigateToLanding = () => {
    navigate("/");
  };
  return (
    <div>
      <div className="usernav-page-color">
        <Navbar collapseOnSelect expand="lg" className="" id="navfixed">
          <div className={`${goToAboutSection ? `col-6` : `col-7  `}`}>
            <Navbar.Brand className="toggleimg">
              <div onClick={navigateToLanding} style={{ cursor: "pointer" }}>
                <img
                  src={logos}
                  style={{ width: "30px", height: "30px" }}
                  className="logoimg ms-3"
                  alt="img"
                ></img>
                <span className="usernav-page-trade">trade</span>{" "}
                <span className="usernav-page-hub">hub</span>
              </div>
            </Navbar.Brand>
          </div>
          <div className="col-4">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <div
                  className="me-5 navlink"
                  style={{ cursor: "pointer" }}
                  onClick={navigateToLanding}
                >
                  <p className="usernav-about">Home</p>
                </div>
                {goToAboutSection && (
                  <div className="me-5 navlink" style={{ cursor: "pointer" }}>
                    <p className="usernav-about" onClick={goToAboutSection}>
                      About
                    </p>
                  </div>
                )}

                <div className="me-5 navlink" style={{ cursor: "pointer" }}>
                  <p
                    className="usernav-about"
                    onClick={() => {
                      navigate("/contactUs");
                    }}
                  >
                    Contact
                  </p>
                </div>

                <Dropdown>
                  <Dropdown.Toggle
                    id="usernav-button"
                    className="ms-5 me-5"
                    style={{ fontSize: "16px" }}
                  >
                    Login
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Link
                      className="dropdown-item"
                      to="/user/login"
                      id="landing-drop-link"
                    >
                      User
                    </Link>

                    <Link
                      className="dropdown-item"
                      to="/moderator/login"
                      id="landing-drop-link"
                    >
                      Moderator
                    </Link>

                    <Link
                      className="dropdown-item"
                      to="/delivery/login"
                      id="landing-drop-link"
                    >
                      Delivery Agent
                    </Link>

                    <Link
                      className="dropdown-item"
                      to="/admin/login"
                      id="landing-drop-link"
                    >
                      Admin
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

export default UserNavbar;

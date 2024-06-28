import React from 'react'
import './MainNav.css'
import Navbar from 'react-bootstrap/Navbar';
import Nav from "react-bootstrap/Nav";
import logos from '../../././../assets/images/logo.png'
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
function UserNavbar() {
  return (
    <div>
      <div className='usernav-page-color'>
      <Navbar collapseOnSelect expand="lg" className="" id="navfixed">
        <div className="col-7">
          <Navbar.Brand href="/" className="toggleimg">
            <img src={logos} className="logoimg ms-3" alt="img"></img>
            <span  className='usernav-page-trade'>trade</span> <span className='usernav-page-hub'>hub</span>
          </Navbar.Brand>
        </div>
        <div className="col-2">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <a href="#home" className="navlink  me-5  text-decoration-none">
                <h6 className="usernav-about">Home</h6>
              </a>
              <a href="#about " className="navlink ms-2 me-5 text-decoration-none">
                <h6 className="usernav-about">About</h6>
              </a>
              <a href="#about " className="navlink ms-2 me-1 text-decoration-none">
                <h6 className="usernav-about">Contact&nbsp;<span>Us</span> </h6>
              </a>
                <Dropdown>
                  <Dropdown.Toggle id='usernav-button' className='ms-5 me-5'>
                    Login
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Link class="dropdown-item" to="/adminlogin" id="landing-drop-link">
                      Admin
                    </Link>
                    <Link class="dropdown-item" to="/mod/login" id="landing-drop-link">
                      Moderator
                    </Link>
                    <Link class="dropdown-item" to="/user/login" id="landing-drop-link">
                     User
                    </Link>
                    <Link class="dropdown-item" to="/delivery/login" id="landing-drop-link">
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
  )
}

export default UserNavbar

import React from 'react'
import './MainNav.css'
import Navbar from 'react-bootstrap/Navbar';
import Nav from "react-bootstrap/Nav";
import logos from '../../././../assets/images/logo.png'
import { Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';

function MainNav() {
  return (
    <div>
      <div className='nav-page-color'>
      <Navbar collapseOnSelect expand="lg" className="" id="navfixed">
        <div className="col-7">
          <Navbar.Brand href="/" className="toggleimg">
            <img src={logos} className="logoimg ms-3" alt="img"></img>
            <span  className='nav-page-trade'>trade</span> <span className='nav-page-hub'>hub</span>
          </Navbar.Brand>
        </div>
        <div className="col-2">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <a href="#home" className="navlink ms-5 me-5  text-decoration-none">
                <h6 className="nav-about">Home</h6>
              </a>
              <a href="#about " className="navlink ms-5 me-5 text-decoration-none">
                <h6 className="nav-about">About</h6>
              </a>
              
              <div class="dropdown" style={{ marginRight: "50px" }}>
                <button
                  // class="btn btn-outline-success dropdown-toggle rounded-4"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  id="nav-button"
                >
                 <Link to='/user/login'> Login</Link>
                </button>
              </div>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
      </div>
    </div>
  )
}

export default MainNav

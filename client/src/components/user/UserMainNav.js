import React from 'react'
import './User.css'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar';
import Nav from "react-bootstrap/Nav";
import logos from '../../assets/images/logo.png'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { IoMdContact } from "react-icons/io";
import { ImLoop } from "react-icons/im";
import { BsChatText } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
function UserMainNav() {
  return (
    <div>
      <div className='usermainnav-page-color'>
      <Navbar collapseOnSelect expand="lg" className="" id="navfixed">
        <div className="col-2">
          <Navbar.Brand href="/" className="toggleimg">
            <img src={logos} className="usermainlogoimg ms-3" alt="img"></img>
            <span  className='usermainnav-page-trade'>trade</span> <span className='usermainnav-page-hub'>hub</span>
          </Navbar.Brand>
        </div>
            <Form className="d-flex">
                <Form.Control
                type="search"
                placeholder="Search"
                className="me-5"
                aria-label="Search"
                />
                
            </Form>
            <Nav.Link href="" className='me-5 '><p className='usermain-navbar-home mt-3 '>Home</p></Nav.Link>
            <Nav.Link href="" className='me-5'><p className='usermain-navbar-home mt-3 '>About</p></Nav.Link>
            <Nav.Link href="" className='me-5'><p className='usermain-navbar-home mt-3 '>My Items</p></Nav.Link>
            <Nav.Link href="" className='me-5'><p className='usermain-navbar-chat mt-3 pt-1'><BsChatText/> Chat</p></Nav.Link>
            <Nav.Link href="" className='me-5'><p className='usermain-navbar-chat mt-3 pt-1'>+Sell</p></Nav.Link>
            <Nav.Link href="" className='me-5'><p className='usermain-navbar-chat mt-3 pt-1'>Points</p></Nav.Link>
            <Nav.Link href="" className='me-5'><ImLoop className='usermain-navbar-iconloop'/></Nav.Link>
            <Nav.Link href="" className='me-5'><IoMdContact className='usermain-navbar-iconloop'/></Nav.Link>
      </Navbar>
      </div>
    </div>
  )
}

export default UserMainNav

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logos from "../../assets/images/logo.png";
import Form from "react-bootstrap/Form";
import { IoMdContact } from "react-icons/io";
import { BsChatText } from "react-icons/bs";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import exchangeIcon from "../../assets/svg/exchange-icon.svg";
import { IoSearch } from "react-icons/io5";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import "./User.css";
function UserMainNav() {
  const [searchValue, setSearchValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleUserLogout = () => {
    console.log("work");
    navigate("/user/login");
  };
  const navigateUserHome = () => {
    navigate("/user/home");
  };

  const userAddProduct = () => {
    navigate("/user/add-product");
  };

  const userViewItems = () => {
    navigate("/user/view-items");
  };
  const redirectToRequest = () => {
    navigate("/user/requests");
  };
  const handleCategory = () => {
    setShow(!show);
  };
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  return (
    <div>
      <div className="usermainnav-page-color ">
        <Navbar
          collapseOnSelect
          expand="lg"
          className="d-flex justify-content-between pe-5"
          id="navfixed"
        >
          <div className="col-2">
            <Navbar.Brand
              onClick={navigateUserHome}
              style={{ cursor: "pointer" }}
              className="toggleimg"
            >
              <img src={logos} className="usermainlogoimg ms-3" alt="img" />
              <span className="usermainnav-page-trade">trade</span>{" "}
              <span className="usermainnav-page-hub">hub</span>
            </Navbar.Brand>
          </div>
          {/* <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-5"
              aria-label="Search"
              onClick={handleCategory}
            />
            <IoSearch className="userNav-search-icons" />
          </Form> */}

          <InputGroup className="mod-product-request-box2 ms-2 ps-3 ">
            <Form.Control
              className="mod-product-request-inp"
              type="text"
              name="search"
              aria-label="search"
              placeholder="Search product"
              aria-describedby="basic-addon1"
              onChange={handleSearch}
            />
            <InputGroup.Text
              id="basic-addon1"
              onClick={() => {
                navigate(`/user/view-all-items/${searchValue}`)
              }}
              className="modproduct-req-search-box" >
              
                <IoSearch className="mod-product-request-search-icon" />
            </InputGroup.Text>
          </InputGroup>

          <p
            className="usermain-navbar-home "
            style={{ cursor: "pointer" }}
            onClick={navigateUserHome}
          >
            Home
          </p>
          {/* <p className="usermain-navbar-home mt-3 ">About</p> */}
          <p className="usermain-navbar-home" onClick={userViewItems}>
            My Items
          </p>
          <Link to="/users/chat" className="me-5">
            <p className="usermain-navbar-chat">
              <BsChatText /> &nbsp; Chat
            </p>
          </Link>

          <Link to="/user/add-product" className="">
            <p className="usermain-navbar-chat">Sell</p>
          </Link>
          {/* <Nav.Link href="" className="">
            <p className="usermain-navbar-chat">Points</p>
          </Nav.Link> */}
          <div
            onClick={redirectToRequest}
            style={{
              height: "40px",
              width: "40px",
              borderRadius: "50%",
              cursor: "pointer",
              top: "-6px",
            }}
            className=" bg-light position-relative mx-3 d-flex justify-content-center align-items-center fs-4"
          >
            <img src={exchangeIcon} alt="loop" />
          </div>
          <Dropdown show={showDropdown} onToggle={toggleDropdown}>
            <Dropdown.Toggle
              as="div"
              onClick={toggleDropdown}
              className="custom-dropdown-toggle userNavbar-arrow "
            >
              <Nav.Link className="" style={{ marginRight: "90px" }}>
                <IoMdContact className="usermain-navbar-iconloop mt-3" />
              </Nav.Link>
            </Dropdown.Toggle>
            <Dropdown.Menu id="drop-down-basic">
              <Link className="dropdown-item" to="/user/user-profile" id="">
                View Profile
              </Link>

              <Link className="dropdown-item" to="/user/wishlist" id="">
                My wishlist
              </Link>
              <Link className="dropdown-item" to="/user/exchange-product" id="">
                My Exchanges
              </Link>
              <Link className="dropdown-item" to="/user/delivered-products" id="">
              product delivered
              </Link>
              <h6
                className="dropdown-item text-danger fw-bold"
                style={{ cursor: "pointer" }}
                onClick={handleUserLogout}
              >
                Logout
              </h6>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar>
      </div>
    </div>
  );
}

export default UserMainNav;

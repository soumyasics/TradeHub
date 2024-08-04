import React, { useEffect, useState } from "react";
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
import InputGroup from "react-bootstrap/InputGroup";
import "./User.css";
import coingImg from "../../assets/images/itemDetailsPoints.png";
import { toast } from "react-hot-toast";
import axiosInstance from "../../apis/axiosInstance";
function UserMainNav() {
  const [searchValue, setSearchValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [show, setShow] = useState(false);
  const [data, setData] = useState({ profile: { filename: "" } });

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
  const redirectToForYou = () => {
    navigate("/user/UserPersonalisedSuggestion");
  };
  const handleCategory = () => {
    setShow(!show);
  };
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const getUserData = (id) => {
    axiosInstance
      .post(`viewUserById/${id}`)
      .then((res) => {
        if (res.data?.status === 200) {
          setData(res.data.data);
          console.log(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    let id = localStorage.getItem("trade-hub-userId") || null;
    if (id) {
      getUserData(id);
    } else {
      toast.error("Please login again.");
      navigate("/user/login");
    }
  }, []);
  return (
    <div>
      <div className="usermainnav-page-color ">
        <Navbar
          collapseOnSelect
          expand="lg"
          className="d-flex justify-content-between"
          id="navfixed"
        >
          <div className="col-2 mb-3">
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
                navigate(`/user/view-all-items/${searchValue}`);
              }}
              className="modproduct-req-search-box"
            >
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
          <Link to="/users/chat" className="me-3">
            <p className="usermain-navbar-chat">
              <BsChatText /> &nbsp; Chat
            </p>
          </Link>

          <Link to="/user/add-product" className="">
            <p className="usermain-navbar-chat">Sell</p>
          </Link>
          <Nav.Link href="" className="">
            {/* <div className="userTransaction-point-box d-flex">
            </div> */}
            <p className="usermain-navbar-chat2">
              <img
                src={coingImg}
                alt="coin"
                style={{ height: "20px", width: "20px" }}
              />
              <span>{data.wallet || 0}</span>
            </p>
          </Nav.Link>
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
            <Dropdown.Menu id="drop-down-basic" style={{ left: "-75px" }}>
              <Link className="dropdown-item" to="/user/user-profile" id="">
                View Profile
              </Link>

              <Link className="dropdown-item" to="/user/wishlist" id="">
                My wishlist
              </Link>
              <Link
                className="dropdown-item"
                to="/user/personalised-sugggestion"
                id=""
              >
                Only for you
              </Link>
              <Link className="dropdown-item" to="/user/exchange-product" id="">
                Accepted Exchanges
              </Link>
              <Link
                className="dropdown-item"
                to="/user/delivered-products"
                id=""
              >
                Delivered Items
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

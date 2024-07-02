import React from "react";
import styles from "./Navbar.module.css";
import tradeHubLogo from "../../../assets/images/trade-hub-logo.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Dropdown, Row } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { axiosMultipartInstance } from "../../../apis/axiosMultipartInstance";
import axiosInstance from "../../../apis/axiosInstance";
export const ModNavbar = ({ hamActive, setHamActive }) => {
  const [modData, setModData] = useState(null);
  const navigate = useNavigate();

  const logo =
    "https://cdn.dribbble.com/userupload/3183290/file/original-096954a049886a792314c4340cf7ed6a.jpg?resize=400x300&vertical=center";
  const handleClick = () => {
    setHamActive(!hamActive);
  };

  const redirectModLogin = () => {
    navigate("/moderator/login");
  };

  const fetchModData = async (modId) => {
    try {
      const res = await axiosInstance.get(`/viewModeratorById/${modId}`);
      const data = res.data?.data || null;
      console.log("resp", res);
      setModData(data);
    } catch (error) {
      console.log("get mod data by id =>", error);
    }
  };

  console.log("modd", modData);
  useEffect(() => {
    const modId = localStorage.getItem("trade-hub-modId") || null;
    if (!modId) {
      toast.error("Please login again.");
      navigate("/moderator/login");
      return;
    }

    fetchModData(modId);
  }, []);

  const redirecModHome = () => {
    navigate("/moderator/home");
  };
  const redirectModViewUsers = () => {
    navigate("/moderator/view-users");
  };
  const redirectModDashboard = () => {
    navigate("/moderator/dashboard");
  };
  return (
    <nav className={`${styles.navbarWrapper} center`}>
      <div className={`${styles.navbarInner} center`}>
        <button
          className={`${styles.hamburger} ${hamActive && styles.active}`}
          onClick={handleClick}
        >
          <span className={styles.hamburgerLines}></span>
        </button>

        <div className={`${styles.navLeft}`} onClick={redirecModHome} >
          <img src={tradeHubLogo} alt="logo" className={styles.brand} />
        </div>
        <div
          className={`${styles.navRight} center`}
          style={{ position: "relative" }}
        >
          <div className={styles.navLinksWrapper}>
            <div className={styles.verticalLine}> </div>
            <p className={`${styles.nav} center`}>View Products</p>
            <p
              className={`${styles.nav} center`}
              onClick={redirectModViewUsers}
            >
              View Users
            </p>
            <p
              className={`${styles.nav} center`}
              onClick={redirectModDashboard}
            >
              Dashboard
            </p>
          </div>

          <Dropdown
            className="me-5"
            style={{ position: "absolute", right: "10px" }}
          >
            <Dropdown.Toggle id="nav-button" className="">
              {modData?.firstname || "Profile"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <div
                class="dropdown-item"
                id="landing-drop-link"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/moderator/profile")}
              >
                Profile
              </div>
              <div class="dropdown-item mt-3" id="landing-drop-link">
                <Button onClick={redirectModLogin} variant="danger">
                  Logout
                </Button>
              </div>
            </Dropdown.Menu>
          </Dropdown>

          <div></div>
        </div>
      </div>
    </nav>
  );
};

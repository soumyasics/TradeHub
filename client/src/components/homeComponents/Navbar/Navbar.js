import React from "react";
import styles from "./Navbar.module.css";
import tradeHubLogo from "../../../assets/images/trade-hub-logo.png";

import { useNavigate } from "react-router-dom";

const Navbar = ({ hamActive, setHamActive }) => {
  const navigate = useNavigate();
  const logo =
    "https://cdn.dribbble.com/userupload/3183290/file/original-096954a049886a792314c4340cf7ed6a.jpg?resize=400x300&vertical=center";
  const handleClick = () => {
    setHamActive(!hamActive);
  };

  const redirectSignup = () => {
    navigate("/user/signup");
  };

  const redirectLogin = () => {
    navigate("/user/login");
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
        <div className={`${styles.navLeft}`}>
          <img src={tradeHubLogo} alt="logo" className={styles.brand} />
        </div>
        <div className={`${styles.navRight} center`}>
          <div className={styles.navLinksWrapper}>
            <div className={styles.verticalLine}> </div>
            <p className={`${styles.nav} center`}>
              Departments
            </p>
            <p className={`${styles.nav} center`}>
              More ways to shop
            </p>
            <p className={`${styles.nav} center`}>
              Help
            </p>
          </div>
          <div>
            <a className={styles.login} onClick={redirectLogin}>
              Log in
            </a>
            <button className={styles.signup} onClick={redirectSignup}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;

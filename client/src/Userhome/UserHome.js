import React from "react";
import Landingpage from "../components/LandingPage/Landingpage";
import HomeCategories from "./HomeCategories";
import Footer from "../components/Footer/Footer";
import UserMainNav from "../components/Users/UserMainNav";

function UserHome() {
  return (
    <div>
      <div>
        <UserMainNav />
        <Landingpage />
        <HomeCategories />
        <Footer />
      </div>
    </div>
  );
}

export default UserHome;

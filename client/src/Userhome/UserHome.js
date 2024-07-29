import React from "react";
import Landingpage from "../components/LandingPage/Landingpage";
import HomeCategories from "./HomeCategories";
import Footer from "../components/Footer/Footer";
import UserMainNav from "../components/Users/UserMainNav";
import { NewArrivalProducts } from "../components/Users/newArrivalProducts/newArriavalProducts";

function UserHome() {
  return (
    <div>
      <UserMainNav />
      <Landingpage />
      <HomeCategories />
      <NewArrivalProducts />
      
      <Footer />
    </div>
  );
}

export default UserHome;

import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/common/home";
import UserSignup from "./pages/user/userSignup/userSignup";
import UserLogin from "./pages/user/userLogin/userLogin";
import ModLogin from "./pages/moderator/modLogin/modLogin";
import DeliveryLogin from "./pages/delivery/deliveryLogin/deliveryLogin";
import ModSignup from "./pages/moderator/modSignup/modSignup";
import DelSignup from "./pages/delivery/deliverySignup/delSignup";
import Landingpage from "./components/LandingPage/Landingpage";
import Adminlogin from "./components/admin/Adminlogin";
import MainNav from "./components/homeComponents/Navbar/MainNav";
import Footer from "./components/Footer/Footer";
import Userlogin from "./components/user/Userlogin";
import Userforget from "./components/user/Userforget";
import UserRegister from "./components/user/UserRegister";
import AdminSidebar from "./components/admin/AdminSidebar";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminViewallUser from "./components/admin/AdminViewallUser";
import UserHome from "./Userhome/UserHome";
import UserNavbar from "./components/homeComponents/Navbar/UserNavbar";
import Userlanding from "./components/user/Userlanding";
import UserMainNav from "./components/user/UserMainNav";
import UserProfile from "./components/user/UserProfile";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter basename="tradehub">
        <Routes>
          {/* common  */}
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Landingpage/>} />
          {/* users  */}

          <Route path="/user/login" element={<Userlogin />} />
          {/* <Route path="/user/profile" element={<UserProfile />} /> */}
          {/* <Route path="/user/profile-edit" element={<UserProfileEdit />} /> */}
          <Route path="/user/forgetpswd" element={<Userforget/>}/>
          <Route path="/user/register" element={<UserRegister/>}/>
          <Route path="/user/home" element={<UserHome/>} />
          <Route path="/user-landing" element={<Userlanding/>} />
          <Route path="/user-mainnavbar" element={<UserMainNav/>}/>
          <Route path="/user/user-profile" element={<UserProfile/>} />
          
          {/* moderators  */}
          <Route path="/mod/login" element={<ModLogin />} />
          <Route path="/mod/signup" element={<ModSignup />} />

          {/* delivery  */}
          <Route path="/delivery/signup" element={<DelSignup />} />
          <Route path="/delivery/login" element={<DeliveryLogin />} />

          {/* Admin */}
          <Route path="/adminlogin" element={<Adminlogin/>}/>
          <Route path="/admin/sidebar" element={<AdminSidebar/>}/>
          <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
          <Route path="/admin/userview" element={<AdminViewallUser/>} />

          <Route path="/*" element={<h1> 404 </h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

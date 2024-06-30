import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ModLogin from "./pages/moderator/modLogin/modLogin";
import DeliveryLogin from "./pages/delivery/deliveryLogin/deliveryLogin";
import ModSignup from "./pages/moderator/modSignup/modSignup";
import DelSignup from "./pages/delivery/deliverySignup/delSignup";
import Adminlogin from "./components/admin/adminLogin/Adminlogin";

import AdminViewallUser from "./components/admin/viewAllUser/AdminViewallUser";
import Userlanding from "./components/Users/Userlanding";
import Userforget from "./components/Users/Userforget";
import UserRegister from "./components/Users/UserRegister";
import UserHome from "./Userhome/UserHome";
import UserProfile from "./components/Users/UserProfile";
import UserEditProfile from "./components/Users/UserEditProfile";
import UserAddItemToSell from "./components/Users/UserAddItemToSell";
import UserViewItemToBuy from "./components/Users/UserViewItemToBuy";
import Userlogin from "./components/Users/Userlogin";
import ModeratorRegister from "./components/moderator/ModeratorRegister";
import Moderatorlogin from "./components/moderator/Moderatorlogin";
import Moderatorforget from "./components/moderator/Moderatorforget";
import { AdminDashboard } from "./components/admin/AdminDashboard";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter basename="tradehub">
        <Routes>
          {/* common  */}
          <Route path="/" element={<Userlanding />} />

          {/* users  */}
          <Route path="/user/login" element={<Userlogin />} />
          <Route path="/user/forgetpswd" element={<Userforget />} />
          <Route path="/user/register" element={<UserRegister />} />
          <Route path="/user/home" element={<UserHome />} />
          <Route path="/user/user-profile" element={<UserProfile />} />
          <Route
            path="/user/user-editprofile/:id"
            element={<UserEditProfile />}
          />
          <Route path="/user/additemtosell" element={<UserAddItemToSell />} />
          <Route path="/user/viewitemtobuy" element={<UserViewItemToBuy />} />

          {/* moderators  */}
          {/* <Route path="/mod/login" element={<ModLogin />} />
          <Route path="/mod/signup" element={<ModSignup />} /> */}
          <Route path="/moderator/register" element={<ModeratorRegister />} />
          <Route path="/moderator/login" element={<Moderatorlogin />} />
          <Route
            path="/moderator/forgetpassword"
            element={<Moderatorforget />}
          />

          {/* delivery  */}
          <Route path="/delivery/signup" element={<DelSignup />} />
          <Route path="/delivery/login" element={<DeliveryLogin />} />

          {/* Admin */}
          <Route path="/adminlogin" element={<Adminlogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* admin components  */}

          <Route path="/*" element={<h1> 404 </h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

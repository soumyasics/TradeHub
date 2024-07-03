import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DeliveryLogin from "./pages/delivery/deliveryLogin/deliveryLogin";
import DelSignup from "./pages/delivery/deliverySignup/delSignup";
import Adminlogin from "./components/Admin/adminLogin/Adminlogin";
import Userlanding from "./components/Users/Userlanding";
import Userforget from "./components/Users/Userforget";
import UserRegister from "./components/Users/UserRegister";
import UserHome from "./Userhome/UserHome";
import UserProfile from "./components/Users/UserProfile";
import UserEditProfile from "./components/Users/UserEditProfile";
import UserAddItemToSell from "./components/Users/UserAddItemToSell";
import UserViewItemToBuy from "./components/Users/UserViewItemToBuy";
import Userlogin from "./components/Users/Userlogin";
import ModeratorRegister from "./components/Moderator/ModeratorRegister";
import Moderatorlogin from "./components/Moderator/Moderatorlogin";
import Moderatorforget from "./components/Moderator/Moderatorforget";
import { AdminDashboard } from "./components/Admin/AdminDashboard";
import {Toaster} from 'react-hot-toast'
import { ModeratorHome } from "./pages/common/moderatorHome";
import { ModProfile } from "./components/Moderator/modProfile/modProfile";
import { ModViewUsers } from "./components/Moderator/modViewUsers/modViewUsers";
import { AddProducts } from "./components/Users/addProducts/addProducts";
import { ViewUserDetails } from "./components/Users/viewUserDetails/viewUserDetails";
import { ViewItems } from "./components/Users/addProducts/viewItems/viewItems";
import ModeratorSidebar from "./components/Moderator/moderatorSidebar/moderatorSidebar";
import ProductRequest from "./components/Moderator/productRequestcontainer/productRequest";
import { ModeratorDashboard } from "./components/Moderator/moderatorDashboard/moderatorDashboard";
import ModeratorItempage from "./components/Moderator/moderatorItemPage/moderatorItempage";
import { ExchangeProductPage } from "./components/Users/exchangePage/exchangeProductPage";
import { ExchangeProduct } from "./components/Users/exchangePage/exchangeProduct/exchangeProduct";
const App = () => {
  return (
    <div className="App">
      <BrowserRouter basename="tradehub">
      <Toaster/> 
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
          {/* <Route path="/user/additemtosell" element={<UserAddItemToSell />} /> */}
          <Route path="/user/viewitemtobuy" element={<UserViewItemToBuy />} />
          <Route path="/user/add-product" element={<AddProducts />} />
          <Route path="/user/view-items" element={<ViewItems/>} />

          {/* moderators  */}

          <Route path="/moderator/register" element={<ModeratorRegister />} />
          <Route path="/moderator/login" element={<Moderatorlogin />} />
          <Route path="/moderator/home" element={<ModeratorHome />} />
          <Route path="/moderator/profile" element={<ModProfile />} />
          <Route path="/moderator/view-users" element={<ModViewUsers />} />
          <Route path="/moderator/view-users/:id" element={<ViewUserDetails />} />
          <Route
            path="/moderator/forgetpassword"
            element={<Moderatorforget />}
          />

          <Route path="/moderator/exchangePage" element={<ExchangeProductPage/>}/>
          <Route path="/moderator/exchangeProduct" element={<ExchangeProduct/>}/>
 {/* new  */}
          <Route path="/moderatorsidebar" element={<ModeratorSidebar/>}/>
          <Route path="/productrequest" element={<ProductRequest/>}/>
          <Route path="/moderator/dashboard" element={<ModeratorDashboard/>}/>
          <Route path="/itemPage" element={<ModeratorItempage/>}/>

          {/* delivery  */}
          <Route path="/delivery/signup" element={<DelSignup />} />
          <Route path="/delivery/login" element={<DeliveryLogin />} />

          {/* Admin */}
          <Route path="/admin/login" element={<Adminlogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* admin components  */}

          <Route path="/*" element={<h1> 404 </h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import { Toaster } from "react-hot-toast";
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
import { ItemDetails } from "./components/Users/itemDetails.jsx/itemDetails";

import { ProductCard } from "./components/Users/productCardContainer/productCard";

import DeliveryAgentLogin from "./components/Delivery/deliveryLogin/deliveryLogin";
import DeliveryAgentSignup from "./components/Delivery/deliverySignup'/deliverySignup";
import Deliveryforgotpassword from "./components/Delivery/deliveryForgotpassword/deliveryforgotpassword";
import { UserTransaction } from "./components/Admin/userTransaction/userTransaction";
import { DeliveryDashboard } from "./components/Delivery/deliveryDashboard/deliveryDashboard";
import { ContactUs } from "./components/common/illustration/contactUs/contactsUs";
import { UsereditProfileCard } from "./components/Users/userEditProfileCard/userEditProfileCard";
import { ModProductDetails } from "./components/Moderator/modProductRequest/modProductDetails";
import { UserProductDetails } from "./components/Users/productDetails/userProductDetails";
import {
  ApprovedBtn,
  RejectedBtn,
} from "./components/common/approvedBtn/approvedBtn";
import { AdminGuideline } from "./components/Admin/admineGuideline/adminGuideline";
import { AdmineViewGuideline } from "./components/Admin/adminViewGuideline/adminViewGuideline";
import { UserConfirmExchange } from "./components/Users/userConfirmExchange/userConfirmExchange";
import { AdminUpdateGuideline } from "./components/Admin/adminUpdateGuideline/admineUpdateGuideline";
import { DeliveryProfile } from "./components/Delivery/deliveryProfile/deliveryProfile";
import { MyDelivery } from "./components/Delivery/myDelivery/myDelivery";
import { UserChatSidebar } from "./components/Users/usersChat/UserChatSidebar/userChatSidebar";
import { NoUserSelected } from "./components/Users/usersChat/noUserSelected/noUserSelected";
import { UserChatDashboard } from "./components/Users/usersChat/userChatDashboard/userChatDashboard";
import { UserchatInterFace } from "./components/Users/usersChat/userChatInterface/userChatInterface";
import { UserWishlist } from "./components/Users/userWishlist/userWishlist";
import { ViewAllItems } from "./components/Users/viewAllItems/viewAllItems";
import { UserChatNavbar } from "./components/Users/usersChat/userChatNavbar/userChatNavbar";
import { UserChatFooter } from "./components/Users/usersChat/userNavbarFooter/userChatFooter";
import { ViewByCategory } from "./components/Users/viewByCategory/viewBycategory";
import { UserProductExchange } from "./components/Users/productExchange/userProductExchange";
import { UserRequestes } from "./components/Users/userRequestes/userRequestes";
import { ModExchangeProduct } from "./components/Moderator/modExchangeProduct/modExhangeProduct";
import { DeliveryDeliveryPending } from "./components/Delivery/deliveryDeliveryPending/delveryDeliveryPending";
import { DeliveryAcceptedOrders } from "./components/Delivery/deliveryAccceptedOrders/deliveryAcceptedOrders";
import { DeliveryRejectedOrders } from "./components/Delivery/deliveryRejectedOrders/deliveryRejectedOrders";
import { UserViewGuideline } from "./components/Users/userViewGuideline/userViewGuideline";
import { ApprovedExchangeProduct } from "./components/Users/approvedExchangeProduct/approvedExchangeProduct";
const App = () => {
  return (
    <div className="App">
      <BrowserRouter basename="tradehub">
        <Toaster />
        <Routes>
          {/* common  */}
          <Route path="/" element={<Userlanding />} />
          <Route path="/contactUs" element={<ContactUs />} />

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
          <Route path="/user/viewitemtobuy" element={<UserViewItemToBuy />} />
          <Route path="/user/add-product" element={<AddProducts />} />
          <Route path="/user/view-items" element={<ViewItems />} />
          <Route path="/user/view-items/:id" element={<UserProductDetails />} />
          <Route
            path="/user/exchange-items/:id"
            element={<UserProductExchange />}
          />
          <Route path="/user/view-all-items" element={<ViewAllItems />} />
          <Route path="/user/product-details" element={<ItemDetails />} />
          <Route path="/user/product-card" element={<ProductCard />} />
          <Route path="/user/edit/profle" element={<UsereditProfileCard />} />
          
          <Route path="/user/chatSidebar" element={<UserChatSidebar />} />
          <Route path="/no/user/selected" element={<NoUserSelected />} />
          <Route path="/users/chat" element={<UserChatDashboard />} />
          <Route path="/user/chat/interface" element={<UserchatInterFace />} />
          <Route path="/user/wishlist" element={<UserWishlist />} />
          <Route path="/user/chat/navbar" element={<UserChatNavbar />} />
          <Route path="user/chat/footer" element={<UserChatFooter />} />
          <Route path="/view-category/:category" element={<ViewByCategory />} />
          <Route path="/user/requests" element={<UserRequestes />} />
          <Route path="/user/view-guideline" element={<UserViewGuideline/>} />
          <Route path="/user/exchange-product" element={<ApprovedExchangeProduct/>} />
          {/* moderators  */} 
          <Route path="/moderator/register" element={<ModeratorRegister />} />
          <Route path="/moderator/login" element={<Moderatorlogin />} />
          <Route path="/moderator/home" element={<ModeratorHome />} />
          <Route path="/moderator/profile" element={<ModProfile />} />
          <Route path="/moderator/view-users" element={<ModViewUsers />} />
          <Route
            path="/moderator/product/:id"
            element={<ModProductDetails />}
          />
          <Route
            path="/moderator/view-users/:id"
            element={<ViewUserDetails />}
          />
          <Route
            path="/moderator/forget-password"
            element={<Moderatorforget />}
          />
<Route path="/moderator/exchange" element={<ModExchangeProduct/>} />

          {/* new-1 */}
          <Route path="/delivery/login" element={<DeliveryAgentLogin />} />
          <Route path="/delivery/signup" element={<DeliveryAgentSignup />} />
          <Route
            path="/agentforgotpassword"
            element={<Deliveryforgotpassword />}
          />
          <Route path="/delivery/profile" element={<DeliveryProfile />} />
          {/* new  */}

          <Route path="/moderator/dashboard" element={<ModeratorDashboard />} />

          <Route path="/delivery/dashboard" element={<DeliveryDashboard />} />
          <Route path="/delivery/pending" element={<DeliveryDeliveryPending/>} />
          <Route path="/delivery/accepted-orders" element={<DeliveryAcceptedOrders/>} />
          <Route path="/delivery/rejected-orders" element={<DeliveryRejectedOrders/>} />
          {/* Admin */}
          <Route path="/admin/login" element={<Adminlogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          {/* new component */}

          <Route path="/admin/Guideline" element={<AdminGuideline />} />
          {/* new */}
          <Route
            path="/admine/view-guideline"
            element={<AdmineViewGuideline />}
          />
          <Route
            path="/admin/update-guideline"
            element={<AdminUpdateGuideline />}
          />
          {/* admin components  */}

          {/* reusable components  */}
          <Route path="/mydelivery" element={<MyDelivery />} />
          <Route path="/admin/usertransaction" element={<UserTransaction />} />
          <Route path="/approved-btn" element={<ApprovedBtn />} />
          <Route path="/rejected-btn" element={<RejectedBtn />} />
          <Route path="/productrequest" element={<ProductRequest />} />
          <Route
            path="/moderator/exchangeProduct"
            element={<ExchangeProduct />}
          />
          <Route
            path="/moderator/exchangePage"
            element={<ExchangeProductPage />}
          />
          <Route path="/*" element={<h1> 404 </h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

// new changes 16-7-2024 : 16:52
export default App;

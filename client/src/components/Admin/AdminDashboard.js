import { AdminOverview } from "./adminOverview/adminOverview";
import { AdminSidebar } from "./adminSidebar/AdminSidebar";
import { AdminViewallUser } from "./viewAllUser/AdminViewallUser";
import { useState } from "react";
import { AdminViewallMods } from "./viewAllUserMods/AdminViewallMods";
import { AdminViewAllDelRequest } from "./deliveryAgentRequest/deliveryAgentReq";
import { AdminViewAllActiveDeliveryAgent } from "./deliveryAgentRequest/viewAllDeliveryAgent";
import { AdminViewAllModRequest } from "./viewAllUserMods/AdminViewAllModeRequest";
import { AdminGuideline } from "./admineGuideline/adminGuideline";
import { AdmineViewGuideline } from "./adminViewGuideline/adminViewGuideline";
import { AdminViewExchange } from "./adminViewExchange/adminViewExchange";
import { AdminWebinar } from "./adminWebinar/adminWebinar";
import { AdminTransaction } from "./adminTransaction/adminTransaction";
import { AdminUploadVideo } from "./adminUploadVideo/adminUploadVideo";
import { ModVideoContainer } from "../Moderator/modViewTutorial/modTutorialCard/modContainer";
import ModViewWebinar from "../Moderator/modViewWebinar/modViewWebinar";
import { AdminViewNewGuideline } from "../Users/userViewGuideline/adminViewGuideline";
import { useNavigate } from "react-router-dom";
import { AdminVideoContainer } from "../Moderator/modViewTutorial/modTutorialCard/adminContainer";
export const AdminDashboard = () => {
  const [selectedPage, setSelectedPage] = useState("overview");
  const navigate =useNavigate()
  const changeSelectedPage = (value) => {
    setSelectedPage(value);
  };

  const redirectToGuideline = () => {
    navigate('/admin/view-guideline')
  };
  const redirectToViewTutorial = () => {
    setSelectedPage("viewTutorial");
  };
  const redirectToViewWebinar = () => {
    setSelectedPage("view-webinar");
  };
  return (
    <div className="d-flex">
      <div>
        <AdminSidebar changeSelectedPage={changeSelectedPage} />
      </div>
      <div className=" w-100">
        {selectedPage === "overview" && <AdminOverview />}
        {selectedPage === "view-all-user" && <AdminViewallUser />}
        {selectedPage === "view-pending-DA" && <AdminViewAllDelRequest />}
        {selectedPage === "view-active-DA" && (
          <AdminViewAllActiveDeliveryAgent />
        )}
        {selectedPage === "view-pending-mod" && <AdminViewAllModRequest />}
        {selectedPage === "view-active-mod" && <AdminViewallMods />}
        {selectedPage === "adminGuideline" && (
          <AdminGuideline redirectToGuideline={redirectToGuideline} />
        )}
        {/* {selectedPage === "adminViewGuideline" && <AdminViewNewGuideline />} */}
        {selectedPage === "transaction" && <AdminTransaction />}
        {selectedPage === "ExchangeItems" && <AdminViewExchange />}
        {selectedPage === "webinar" && (
          <AdminWebinar redirectToViewWebinar={redirectToViewWebinar} />
        )}
        {selectedPage == "view-webinar" && <ModViewWebinar user="admin" />}
        {selectedPage === "uploadTutorial" && (
          <AdminUploadVideo redirectToViewTutorial={redirectToViewTutorial} />
        )}
        {selectedPage === "viewTutorial" && <AdminVideoContainer />}
      </div>
    </div>
  );
};

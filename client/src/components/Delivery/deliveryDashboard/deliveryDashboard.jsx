import { DeliveryOverview } from "../deliveryOverview/deliveryOverview";
import { DeliveryAgentSidebar } from "../deliverySidebar/deliverySidebar";
import { useState } from "react";
import { DeliveryViewallUser } from "../viewAllUsers/deliveryViewAllusers";
export const DeliveryDashboard = () => {
    const [selectedPage, setSelectedPage] = useState("overview");
  
    const changeSelectedPage = (value) => {
      setSelectedPage(value);
    };
    return (
      <div className="d-flex">
        <div>
          <DeliveryAgentSidebar changeSelectedPage={changeSelectedPage} />
        </div>
        <div className=" w-100">
          {selectedPage === "overview" && <DeliveryOverview />}
          {selectedPage === "view-users" && <DeliveryViewallUser />}
        </div>
      </div>
    );
  };
  
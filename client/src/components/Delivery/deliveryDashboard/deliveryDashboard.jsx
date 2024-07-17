import { DeliveryOverview } from "../deliveryOverview/deliveryOverview";
import { DeliveryAgentSidebar } from "../deliverySidebar/deliverySidebar";
import { useState } from "react";
import { DeliveryViewallUser } from "../viewAllUsers/deliveryViewAllusers";
import { DeliveryProfile } from "../deliveryProfile/deliveryProfile";
import { MyDelivery } from "../myDelivery/myDelivery";
import { DeliveryDeliveryPending } from "../deliveryDeliveryPending/delveryDeliveryPending";
import { DeliveryAcceptedOrders } from "../deliveryAccceptedOrders/deliveryAcceptedOrders";
import { DeliveryRejectedOrders } from "../deliveryRejectedOrders/deliveryRejectedOrders";
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
          {selectedPage === "profile" && <DeliveryProfile />}
          {selectedPage === "MyDeliveries" && <MyDelivery />}
          {selectedPage === "deliveryPending" && <DeliveryDeliveryPending/>}
          {selectedPage === "acceptedOrders" && <DeliveryAcceptedOrders/>}
          {selectedPage === "rejectedOrders" && <DeliveryRejectedOrders/>}
        </div>
      </div>
    );
  };
  
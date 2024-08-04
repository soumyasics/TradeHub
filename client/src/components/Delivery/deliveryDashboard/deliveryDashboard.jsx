import { DeliveryOverview } from "../deliveryOverview/deliveryOverview";
import { DeliveryAgentSidebar } from "../deliverySidebar/deliverySidebar";
import { useState } from "react";
import { DeliveryProfile } from "../deliveryProfile/deliveryProfile";
import { MyDelivery } from "../myDelivery/myDelivery";
import {  DeliveryRequest } from "../deliveryDeliveryPending/delveryDeliveryPending";
import { DeliveryAcceptedOrders } from "../deliveryAccceptedOrders/deliveryAcceptedOrders";
import { DeliveryRejectedOrders } from "../deliveryRejectedOrders/deliveryRejectedOrders";
import { DeliveryPending } from "../deliveryPending/deliveryPending";
import { DeliveredOrders } from "../deliveredOrders/deliveredOrders";
import { DeliveryViewallUser2 } from "../viewAllUsers/deliveryViewAllusers copy";
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
          {selectedPage === "profile" && <DeliveryProfile />}
          {selectedPage === "view-users" && <DeliveryViewallUser2 />}
          {selectedPage === "MyDeliveries" && <MyDelivery />}
          {selectedPage === "deliveryRequest" && <DeliveryRequest/>}
          {selectedPage === "acceptedOrders" && <DeliveryAcceptedOrders/>}
          {selectedPage === "rejectedOrders" && <DeliveryRejectedOrders/>}
          {selectedPage === "deliveryPending" && <DeliveryPending/>} 
          {selectedPage === "deliveredOrders" && <DeliveredOrders/>} 
        </div>
      </div>
    );
  };
  
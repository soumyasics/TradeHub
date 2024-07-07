import { useState } from "react";
import ModeratorSidebar from "../moderatorSidebar/moderatorSidebar";
import ModeratorItempage from "../moderatorItemPage/moderatorItempage";
import { ModeratorOverview } from "../overview/moderatorOverview";
import { ModViewallUser } from "../viewAllUsers/modViewAllusers";
import { ModProductRequest } from "../modProductRequest/modProductRequest";
import { ModProductDetails } from "../modProductRequest/modProductDetails";
import { ModRejectedProduct } from "../modProductRequest/modRejectedProduct";
import { ModApprovedProduct } from "../modProductRequest/modApprovedProduct";

export const ModeratorDashboard = () => {
  const [selectpage, setSelectpage] = useState("overview");
  const changeSelectedPage = (value) => {
    setSelectpage(value);
  };
  const [activeProductId, setProductId] = useState("");
  const updateProductId = (id) => {
    setProductId(() => id);
    setSelectpage("product-details");
  };


  return (
    <div className="d-flex">
      <div>
        <ModeratorSidebar changeSelectedPage={changeSelectedPage} />
      </div>
      <div className="w-100">
        {selectpage === "overview" && <ModeratorOverview />}
        {selectpage === "pending-items" && (
          <ModProductRequest updateProductId={updateProductId} />
        )}
        {selectpage === "rejected-items" && (
          <ModRejectedProduct updateProductId={updateProductId} />
        )}
        {selectpage === "approved-items" && (
          <ModApprovedProduct updateProductId={updateProductId} />
        )}
        {selectpage === "view-users" && <ModViewallUser />}
        {selectpage === "product-details" && (
          <ModProductDetails productId={activeProductId} />
        )}
      </div>
    </div>
  );
};

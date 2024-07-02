import { useState } from "react";
import ModeratorSidebar from "../moderatorSidebar/moderatorSidebar";
import ProductRequest from "../productRequestcontainer/productRequest";
import ModeratorItempage from "../moderatorItemPage/moderatorItempage";
import { ModeratorOverview } from "../overview/moderatorOverview";

export const ModeratorDashboard = () => {
  const [selectpage, setSelectpage] = useState("overview");
  const changeSelectedPage = (value) => {
    setSelectpage(value);
  };
  return (
    <div className="d-flex">
      <div>
        <ModeratorSidebar changeSelectedPage={changeSelectedPage} />
      </div>
      <div className="w-100">
        {selectpage === "overview" && <ModeratorOverview />}
        {selectpage === "items" && <ProductRequest />}
      </div>
    </div>
  );
};

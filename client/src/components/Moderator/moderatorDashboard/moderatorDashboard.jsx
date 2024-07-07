import { useState } from "react";
import ModeratorSidebar from "../moderatorSidebar/moderatorSidebar";
import ModeratorItempage from "../moderatorItemPage/moderatorItempage";
import { ModeratorOverview } from "../overview/moderatorOverview";
import { ModViewallUser } from "../viewAllUsers/modViewAllusers";
import { ModProductRequest } from "../modProductRequest/modProductRequest";

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
        {selectpage === "pending-items" && <ModProductRequest />}
        {selectpage === "view-users" && <ModViewallUser />}
      </div>
    </div>
  );
};

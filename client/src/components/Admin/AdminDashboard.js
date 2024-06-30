import { AdminOverview } from "./adminOverview/adminOverview";
import { AdminSidebar } from "./adminSidebar/AdminSidebar";
import { AdminViewallUser } from "./viewAllUser/AdminViewallUser";
import { useState } from "react";
import { AdminViewallMods } from "./viewAllUserMods/AdminViewallMods";
export const AdminDashboard = () => {
  const [selectedPage, setSelectedPage] = useState("overview");

  const changeSelectedPage = (value) => {
    setSelectedPage(value);
  };
  return (
    <div className="d-flex">
      <div>
        <AdminSidebar changeSelectedPage={changeSelectedPage} />
      </div>
      <div className=" w-100">
        {selectedPage === "overview" && <AdminOverview />}
        {selectedPage === "view-all-user" && <AdminViewallUser />}
        {selectedPage === "view-moderators" && <AdminViewallMods />}
      </div>
    </div>
  );
};

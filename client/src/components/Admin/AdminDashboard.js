import { AdminOverview } from "./adminOverview/adminOverview";
import { AdminSidebar } from "./adminSidebar/AdminSidebar";
import { AdminViewallUser } from "./viewAllUser/AdminViewallUser";
import { useState } from "react";
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
      </div>
    </div>
  );
};

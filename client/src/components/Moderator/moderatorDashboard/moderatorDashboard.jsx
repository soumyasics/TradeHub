import { useState } from "react";
import ModeratorSidebar from "../moderatorSidebar/moderatorSidebar";
import ProductRequest from "../productRequestcontainer/productRequest";
import ModeratorItempage from "../moderatorItemPage/moderatorItempage";

export const ModeratorDashboard = () => {
  const [selectpage, setSelectpage] = useState("productrequest");
  const changeSelectedPage = (value) => {
    setSelectpage(value);
  };
  return (
    <div className="d-flex">
      <div>
        <ModeratorSidebar changeSelectedPage={changeSelectedPage} />
      </div>
      <div className="w-100">
        {selectpage === "productrequest" && <ProductRequest />}
        {selectpage === "itempage" && <ModeratorItempage />}
      </div>
    </div>
  );
};

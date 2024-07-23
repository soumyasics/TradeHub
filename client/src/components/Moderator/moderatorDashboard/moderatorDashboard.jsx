import { useEffect, useState } from "react";
import ModeratorSidebar from "../moderatorSidebar/moderatorSidebar";
import ModeratorItempage from "../moderatorItemPage/moderatorItempage";
import { ModeratorOverview } from "../overview/moderatorOverview";
import { ModViewallUser } from "../viewAllUsers/modViewAllusers";
import { ModProductRequest } from "../modProductRequest/modProductRequest";
import { ModProductDetails } from "../modProductRequest/modProductDetails";
import { ModRejectedProduct } from "../modProductRequest/modRejectedProduct";
import { ModApprovedProduct } from "../modProductRequest/modApprovedProduct";
import { ModExchangeProduct } from "../modExchangeProduct/modExhangeProduct";
import ModeratorQuiz from "../moderatorQuiz/moderatorQuiz";
import { ModTestContainer } from "../moderatorQuiz/modTestContainer";
import axiosInstance from "../../../apis/axiosInstance";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export const ModeratorDashboard = () => {
  const [selectpage, setSelectpage] = useState("overview");
  const [modData, setModData] = useState({});
  const navigate = useNavigate();
  const changeSelectedPage = (value) => {
    if (value === "test") {
      setSelectpage(value);
      return;
    }

    if (modData.isTestTaken === false) {
      toast.error("Please take test first");
      setSelectpage("test");
      return;
    }

    if (modData.adminApproved === "pending") {
      toast.error("Please wait for admin approval");
      return;
    }
    if (modData.adminApproved === "reject") {
      toast.error("Your account is rejected by admin");
      return;
    }
    setSelectpage(value);
  };
  const [activeProductId, setProductId] = useState("");
  const updateProductId = (id) => {
    setProductId(() => id);
    setSelectpage("product-details");
  };

  const navigateToOverview = () => {
    setSelectpage("overview");
    fetchModData();
  };

  const fetchModData = async (modId) => {
    try {
      const res = await axiosInstance.get(`viewModeratorById/${modId}`);
      const data = res.data?.data || null;
      console.log("resp", res);
      if (!data.isTestTaken) {
        setSelectpage("test");
      }
      setModData(data);
    } catch (error) {
      console.log("get mod data by id =>", error);
    }
  };

  useEffect(() => {
    const modId = localStorage.getItem("trade-hub-modId") || null;
    if (!modId) {
      toast.error("Please login again.");
      navigate("/moderator/login");
      return;
    }

    fetchModData(modId);
  }, []);

  return (
    <div className="d-flex">
      <div>
        <ModeratorSidebar changeSelectedPage={changeSelectedPage} />
      </div>
      <div className="w-100">
        {selectpage === "overview" && (
          <ModeratorOverview
            updateProductId={updateProductId}
            modData={modData}
          />
        )}
        {selectpage === "pending-items" && (
          <ModProductRequest
            updateProductId={updateProductId}
            title="Pending product request"
          />
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
        {selectpage == "exchangeItem" && <ModExchangeProduct />}
        {selectpage == "test" && (
          <ModTestContainer navigateToOverview={navigateToOverview} />
        )}
      </div>
    </div>
  );
};

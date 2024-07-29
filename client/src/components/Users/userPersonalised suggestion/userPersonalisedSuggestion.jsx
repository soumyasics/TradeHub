import { FaChevronRight } from "react-icons/fa";
import img2 from "../../../assets/images/itemDetailsPoints.png";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./userPersonalisedSuggestion.css";
import axiosInstance from "../../../apis/axiosInstance";
import { BASE_URL } from "../../../apis/baseURL";
export const UserPersonalisedSuggestion = () => {
  const [approvedItems, setApprovedItems] = useState([]);
  const [activeUserId, setActiveUserId] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const userId = localStorage.getItem("trade-hub-userId") || null;
    if (userId) {
      setActiveUserId(userId);
      getAllApprovedItems();
    } else {
      toast.error("Please login again");
      navigate("/user/login");
    }
  }, []);

  const getAllApprovedItems = async () => {
    try {
      const res = await axiosInstance.get("viewAllApproveItems");
      if (res.status === 200) {
        setApprovedItems(res.data.data);
      }
    } catch (error) {
      console.log("Error in getAllApprovedItems", error);
    }
  };


  return (
    <div className="productCard-body">
      <div className="d-flex justify-content-center mt-5">
        <h6 className="user-wishlist-heading3">Products You Might Like</h6>
      </div>
      <div className="container text-center">
        <div className="row row-cols-4 gap-5 d-flex my-5">
          {approvedItems.map((e) => {
            if (e?.userId._id === activeUserId) {
              return null;
            }

            const itemFilename = e?.itemPhoto?.filename || null;
            let itemPicUrl =
              "https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg";
            if (itemFilename) {
              itemPicUrl = `${BASE_URL}${itemFilename}`;
            }

            return (
              <div
                className="card productCard-box2"
                key={e._id}
                style={{ width: "18rem" }}
              >
                <img
                  src={itemPicUrl}
                  className="card-img-top w-100 h-50"
                  alt="..."
                />

                <div className="d-flex" style={{ height: "120px" }}>
                  <div className="card-body ">
                    <h6 className="card-text">{e?.name} </h6>
                    <span className="card-text">
                      {e?.description?.length > 30
                        ? e?.description?.substring(0, 30) + "..."
                        : e?.description}
                    </span>
                  </div>
                  <div className="productCard-points-box d-flex ">
                    <img src={img2} alt="coin" />
                    <p>{e?.point}</p>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    className="productCard-button2"
                    onClick={() => {
                      navigate(`/user/exchange-items/${e._id}`);
                    }}
                  >
                    Exchange Now <FaChevronRight />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="user-view-more-btn">
         
        </div>
      </div>
    </div>
  );
};

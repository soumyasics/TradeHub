import "./viewByCategory.css";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import img2 from "../../../assets/images/itemDetailsPoints.png";
import img1 from "../../../assets/images/productCardImage.png";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance";
import toast from "react-hot-toast";
import { BASE_URL } from "../../../apis/baseURL";
import UserMainNav from "../UserMainNav";
import Footer from "../../Footer/Footer";

export const ViewByCategory = () => {
  const { category } = useParams();
  const [Items, setItems] = useState([]);
  const [activeUserId, setActiveUserId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("trade-hub-userId") || null;
    if (category && userId) {
      setActiveUserId(userId);
      getItemsByCategory();
    } else {
      toast.error("login again");
      navigate("/user/login");
    }
  }, []);

  const getItemsByCategory = async () => {
    try {
      const response = await axiosInstance.get(
        `getApprovedItemsByCategory/${category}`
      );
      if (response.status == 200) {
        console.log(response);
        setItems(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addItemToWishlist = async (itemId) => {
    if (!activeUserId || !itemId) {
      console.log("Error in addItemToWishlist", activeUserId, itemId);
      return;
    }
    try {
      const res = await axiosInstance.post(`addToWishlist`, {
        itemId,
        userId: activeUserId,
      });
      if (res.status === 201) {
        toast.success(res.data.msg);
      }
    } catch (error) {
      console.log("Error in addToWishList", error);
      const status = error?.response.status;
      if (status === 400 || status === 404 || status === 500) {
        toast.error(error.response?.data?.msg || "Network issue");
      } else {
        toast.error("Network issue.");
      }
    } finally {
      getItemsByCategory();
    }
  };

  const removeItemFromWishlist = async (itemId) => {
    console.log("removeItemFromWishlist", itemId);
    if (!activeUserId || !itemId) {
      console.log("Error in addItemToWishlist", activeUserId, itemId);
      return;
    }
    try {
      const res = await axiosInstance.post(`removeFromWishlist`, {
        itemId,
        userId: activeUserId,
      });
      if (res.status === 200) {
        toast.success(res.data.msg);
      }
    } catch (error) {
      console.log("Error in remove item from wishlist", error);
    } finally {
      getItemsByCategory();
    }
  };

  return (
    <div className="productCard-body">
      <UserMainNav />
      <h5 className="user-wishlist-heading2">{category}</h5>
      <div className="container text-center" style={{ minHeight: "600px" }}>
        <div className="row row-cols-4 gap-5 d-flex my-5">
          {Items.map((e) => {
            console.log("e user id", e.userId, activeUserId);
            if (e?.userId._id === activeUserId) {
              return null;
            }

            const itemFilename = e?.itemPhoto?.filename || null;
            let itemPicUrl =
              "https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg";
            if (itemFilename) {
              itemPicUrl = `${BASE_URL}${itemFilename}`;
            }
            let isAlreadyWishlisted = false;

            const wishlistArr = e?.wishlistedUsersId || [];
            if (wishlistArr.includes(activeUserId)) {
              isAlreadyWishlisted = true;
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
                  {!isAlreadyWishlisted ? (
                    <div
                      className="wishlist-heart-icon"
                      onClick={() => {
                        addItemToWishlist(e._id);
                      }}
                    >
                      <CiHeart className="user-wish-list-heart" />
                    </div>
                  ) : (
                    <div
                      className="wishlist-heart-icon"
                      onClick={() => {
                        removeItemFromWishlist(e._id);
                      }}
                    >
                      <FaHeart className="user-wishlist-fill-heart" />
                    </div>
                  )}

                  <div className="card-body ">
                    <h6 className="card-text">{e?.name?.substring(0, 25)} </h6>
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
        <div className="user-view-more-btn"></div>
      </div>
      <Footer />
    </div>
  );
};

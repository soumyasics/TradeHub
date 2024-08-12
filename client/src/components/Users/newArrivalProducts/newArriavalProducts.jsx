import { FaChevronRight } from "react-icons/fa";
import img2 from "../../../assets/images/itemDetailsPoints.png";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance";
import { BASE_URL } from "../../../apis/baseURL";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./newArrivalproducts.css";
import noProductIllus from "../../../assets/illus/no-product.png";
export const NewArrivalProducts = () => {
  const [approvedItems, setApprovedItems] = useState([]);
  const [activeUserId, setActiveUserId] = useState(null);
  const [countProduct, setCountProduct] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const userId = localStorage.getItem("trade-hub-userId") || null;
    if (userId) {
      setActiveUserId(userId);
    } else {
      toast.error("Please login again");
      navigate("/user/login");
    }
  }, []);

  useEffect(() => {
    if (activeUserId) {
      getAllApprovedItems();
    }
  }, [activeUserId]);
  const getAllApprovedItems = async () => {
    try {
      const res = await axiosInstance.get("viewAllApproveItems");
      if (res.status === 200) {
        const rev = res.data.data.reverse();
        let countOthersProduct = rev.reduce((count, e) => {
          return e?.userId?._id !== activeUserId ? count + 1 : count;
        }, 0);

        setCountProduct(countOthersProduct);
        setApprovedItems(rev);
      }
    } catch (error) {
      console.log("Error in getAllApprovedItems", error);
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
      getAllApprovedItems();
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
      getAllApprovedItems();
    }
  };
  return (
    <div className="productCard-body">
      {countProduct > 0 && (
        <h6 className="user-wishlist-heading3 text-center">
          Products you might like
        </h6>
      )}
      <div className="d-flex justify-content-center mt-5">
        {countProduct > 0 ? (
          <>
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
                <button
                  onClick={() => {
                    navigate("/user/view-all-items");
                  }}
                >
                  View More{" "}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="d-flex flex-column align-items-center">
            <img
              src={noProductIllus}
              alt="No product"
              style={{ width: "250px", height: "250px" }}
            />
            <h6 className="user-wishlist-heading3">Nothing found. </h6>
          </div>
        )}
      </div>
    </div>
  );
};

import "./userWishlist.css";
import { FaChevronRight } from "react-icons/fa";
import img2 from "../../../assets/images/itemDetailsPoints.png";
import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance";
import { BASE_URL } from "../../../apis/baseURL";
import toast from "react-hot-toast";
import UserMainNav from "../UserMainNav";
import Footer from "../../Footer/Footer";
import { useNavigate } from "react-router-dom";
export const UserWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [activeUserId, setActiveUserId] = useState(null);
  const navigate = useNavigate();
  const userWishlist = async () => {
    try {
      const res = await axiosInstance.get(
        `getAllWishlistsByUserId/${activeUserId}`
      );
      if (res.status == 200) {
        setWishlist(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const userId = localStorage.getItem("trade-hub-userId") || null;
    if (userId) {
      setActiveUserId(userId);
    }
  }, []);
  useEffect(() => {
    if (activeUserId) {
      userWishlist();
    }
  }, [activeUserId]);

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
      userWishlist();
    }
  };

  return (
    <>
      <div className="productCard-body">
        <UserMainNav />
        {wishlist.length > 0 && (
          <h3 className="user-wishlist-heading">Wishlist</h3>
        )}

        <div className="container text-center">
          {wishlist.length == 0 && (
            <div>
              <h3 className="mt-5">You have not added any wishlist items</h3>
            </div>
          )}
          <div className="d-flex justify-content-start gap-5 w-100  flex-wrap">
            {wishlist.map((e) => {
              const item = e?.itemId;
              const itemFilename = item?.itemPhoto?.filename || null;
              let itemPicUrl =
                "https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg";
              if (itemFilename) {
                itemPicUrl = `${BASE_URL}${itemFilename}`;
              }

              return (
                <div key={e?._id}>
                  <div
                    className="card productCard-box"
                    style={{ width: "18rem" }}
                  >
                    <img
                      src={itemPicUrl}
                      className="card-img-top w-100 h-50"
                      alt="..."
                    />

                    <div className="d-flex" style={{ height: "120px" }}>
                      <div
                        className="wishlist-heart-icon"
                        onClick={() => {
                          removeItemFromWishlist(item?._id);
                        }}
                      >
                        <FaHeart className="user-wishlist-fill-heart" />
                      </div>

                      <div className="card-body ">
                        {/* <p className="card-text">{item?.name} </p>
                        <h5 className="card-title">
                          {item?.description?.substring(0, 40)}
                        </h5> */}
                        <h6 className="card-text">
                          {item?.name?.substring(0, 25)}{" "}
                        </h6>
                        <span className="card-text">
                          {item?.description?.length > 30
                            ? item?.description?.substring(0, 30) + "..."
                            : item?.description}
                        </span>
                      </div>
                      <div className="productCard-points-box d-flex ">
                        <img src={img2} alt="" />
                        <p> {item?.point}</p>
                      </div>
                    </div>
                    <button
                      className="productCard-button"
                      onClick={() => {
                        navigate(`/user/exchange-items/${item?._id}`);
                      }}
                    >
                      Exchange Now <FaChevronRight />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Footer />
      </div>
    </>
  );
};

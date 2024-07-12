import "./userWishlist.css";
import { FaChevronRight } from "react-icons/fa";
import img1 from "../../../assets/images/productCardImage.png";
import img2 from "../../../assets/images/itemDetailsPoints.png";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance";
import { BASE_URL } from "../../../apis/baseURL";
export const UserWishlist = () => {
  const [wishlist, setWishlist] = useState([{ itemPhoto: { filename: "" } }]);
  const [usersId, setUsersId] = useState("");
  const [wishBtn, setWishBtn] = useState(false);
  let cardDetails = [
    {
      image: img1,
      name: "Airpode Pro",
      description: "Brand New Airpode pro",
      points: 100,
    },
    {
      image: img1,
      name: "Airpode Pro",
      description: "Brand New Airpode pro",
      points: 100,
    },
    {
      image: img1,
      name: "Airpode Pro",
      description: "Brand New Airpode pro",
      points: 100,
    },
    {
      image: img1,
      name: "Airpode Pro",
      description: "Brand New Airpode pro",
      points: 100,
    },
    {
      image: img1,
      name: "Airpode Pro",
      description: "Brand New Airpode pro",
      points: 100,
    },
  ];
  const userWishlist = async () => {
    try {
      const res = await axiosInstance.get(`getAllWishlistsByUserId/${usersId}`);
      if (res.status == 200) {
        setWishlist(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log("dataaaa", wishlist);
  useEffect(() => {
    const userId = localStorage.getItem("trade-hub-userId") || null;

    if (userId) {
      setUsersId(userId);
    }
  }, []);
  useEffect(() => {
    if (usersId) {
      userWishlist();
    }
  }, [usersId]);

  const btnWish = () => {
    setWishBtn(!wishBtn);
  };

  return (
    <div className="productCard-body">
      <h3 className="user-wishlist-heading">Wishlist</h3>
      <div className="container text-center">
        <div className="row row-cols-4">
          {wishlist.map((e) => {
            const item = e.itemId;
            const itemFilename = item?.itemPhoto?.filename || null;
            let itemPicUrl =
              "https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg";
            if (itemFilename) {
              itemPicUrl = `${BASE_URL}${itemFilename}`;
            }

            return (
              <div>
                <div
                  className="card productCard-box"
                  style={{ width: "18rem" }}
                >
                  <img
                    src={itemPicUrl}
                    className="card-img-top w-100 h-50"
                    alt="..."
                  />

                  <div className="d-flex">
                    {wishBtn ? (
                      <CiHeart
                        className="user-wish-list-heart"
                        onClick={btnWish}
                      />
                    ) : (
                      <FaHeart
                        className="user-wishlist-fill-heart"
                        onClick={btnWish}
                      />
                    )}

                    <div className="card-body ">
                      <p className="card-text">{item?.name} </p>
                      <h5 className="card-title">
                        {item?.description?.substring(0, 40)}
                      </h5>
                    </div>
                    <div className="productCard-points-box d-flex ">
                      <img src={img2} alt="" />
                      <p> {item?.point}</p>
                    </div>
                  </div>
                  <button className="productCard-button">
                    Exchange Now <FaChevronRight />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

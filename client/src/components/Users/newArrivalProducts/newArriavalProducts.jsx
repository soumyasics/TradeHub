import "./newArrivalproducts.css";
import { FaChevronRight } from "react-icons/fa";
import img1 from "../../../assets/images/productCardImage.png";
import img2 from "../../../assets/images/itemDetailsPoints.png";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance";
import { BASE_URL } from "../../../apis/baseURL";
export const NewArrivalProducts = () => {
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
  const [approvedItems, setApprovedItems] = useState([]);
  const [wishBtn, setWishBtn] = useState(false);
  useEffect(() => {
    getAllApprovedItems();
  }, []);

  console.log("approvedItems", approvedItems);

  const getAllApprovedItems = async (req, res) => {
    try {
      const res = await axiosInstance.get("viewAllApproveItems");
      if (res.status === 200) {
        setApprovedItems(res.data.data);
      }
    } catch (error) {
      console.log("Error in getAllApprovedItems", error);
    }
  };

  const btnWish = () => {
    setWishBtn(!wishBtn);
  };
  return (
    <div className="productCard-body">
      <h5 className="user-wishlist-heading2">New Arrivals</h5>
      <div class="container text-center">
        <div class="row row-cols-4 gap-5 d-flex my-5">
          {approvedItems.map((e) => {
            const itemFilename = e?.itemPhoto?.filename || null;
            let itemPicUrl =
              "https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg";
            if (itemFilename) {
              itemPicUrl = `${BASE_URL}${itemFilename}`;
            }
            console.log("e item", e);
            return (
              <div className="card productCard-box2" style={{ width: "18rem" }}>
                <img
                  src={itemPicUrl}
                  className="card-img-top w-100 h-50"
                  alt="..."
                />

                <div className="d-flex" style={{ height: "120px" }}>
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
                    <h5 className="card-text">{e?.name} </h5>
                    <p className="card-text">
                      {e?.description?.substring(0, 40)}
                    </p>
                  </div>
                  <div className="productCard-points-box d-flex ">
                    <img src={img2} alt="" />
                    <p>{e?.point}</p>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <button className="productCard-button2">
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

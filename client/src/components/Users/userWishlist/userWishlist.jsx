import "./userWishlist.css";
import { FaChevronRight } from "react-icons/fa";
import img1 from "../../../assets/images/productCardImage.png";
import img2 from "../../../assets/images/itemDetailsPoints.png";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance";
export const UserWishlist = () => {
  const [wishlist, setWishlist] = useState([{}]);
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
      const res = await axiosInstance.get(
        `getAllWishlistsByUserId/${usersId}`      
      );
      if(res.status == 200)
      {
        setWishlist(res.data.data)
       
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
};
console.log("dataaaa",wishlist);
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
             const item = e.itemId
            return (
              <div>
                <div
                  className="card productCard-box"
                  style={{ width: "18rem" }}
                >
                  <img src={e.image} className="card-img-top" alt="..." />

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
                      <h5 className="card-title">Description</h5>
                      <p className="card-text">{e.description}</p>
                    </div>
                    <div className="productCard-points-box d-flex ">
                      <img src={img2} alt="" />
                      <p>{e.points}</p>
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

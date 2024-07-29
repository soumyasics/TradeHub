import { FaChevronRight } from "react-icons/fa";
import img2 from "../../../../assets/images/itemDetailsPoints.png";
import img3 from "../../../../assets/images/userTransactionImage2.svg";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./userDeliveredProducts.css";
import axiosInstance from "../../../../apis/axiosInstance";
import { BASE_URL } from "../../../../apis/baseURL";
import MainNav from "../../../homeComponents/Navbar/MainNav";
import Footer from "../../../Footer/Footer";
import UserMainNav from "../../UserMainNav";
export const UserDeliveredProducts = () => {
  const [approvedItems, setApprovedItems] = useState([]);
  const [activeUserId, setActiveUserId] = useState(null);
  const navigate = useNavigate();

  const [requestData, setRequestData] = useState([]);
  const getRequest = async () => {
    try {
      const response = await axiosInstance.get("getAllExchangeRequests");
      if (response.status == 200) {
        console.log("fdgd", response.data.data);
        const data = response.data.data;
        setRequestData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(requestData);

  useEffect(() => {
    getRequest();
  }, []);

  return (
    <div className="productCard-body">
        <UserMainNav/>
      <div className="d-flex justify-content-center mt-5">
        <h6 className="user-wishlist-heading3">Delivered Products</h6>
      </div>
      <div className="row " style={{marginLeft:"5%"}}>
        {requestData.map((e) => {
            console.log(e);
          const buyer = e?.buyerId;
          const buyerProduct = e?.buyerProductId;
          const buyerProductFilename =
            buyerProduct?.itemPhoto?.filename || null;
          let buyerProductPic =
            "https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg";
          if (buyerProductFilename) {
            buyerProductPic = `${BASE_URL}${buyerProductFilename}`;
          }

          const seller = e?.sellerId;
          const sellerProduct = e?.sellerProductId;

          const sellerProductFilename =
            sellerProduct?.itemPhoto?.filename || null;
          let sellerProductPic =
            "https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg";
          if (sellerProductFilename) {
            sellerProductPic = `${BASE_URL}${sellerProductFilename}`;
          }
          return (
            <div className="container text-center  col-6 ">
              <div className="row">
                <div className=" userDeliveryProduct-box shadow row">
                  <div
                    className="card productCard-box3  col-5"
                    style={{ width: "18rem" }}
                  >
                    <img src={buyerProductPic} className="card-img-top w-100 h-50" alt="..." />

                    <div className="d-flex" style={{ height: "120px" }}>
                      <div className="card-body ">
                        <h6 className="card-text"> {buyerProduct.name}</h6>
                      </div>
                      <div className="productCard-points-box d-flex ">
                        <img src={img2} alt="coin" />
                        <p>{buyerProduct.point}</p>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center">
                      <button
                        className="userDeliverdProducts-viewmore"
                        onClick={() => {
                          navigate(`/user/exchange-items`);
                        }}
                      >
                        view more
                      </button>
                    </div>
                  </div>

                  <div
                    style={{ width: "50px", height: "50px", marginTop: "25%" }}
                    className="col-2"
                  >
                    <img src={img3} alt="icon" className="w-100" />
                  </div>

                  <div
                    className="card productCard-box3 col-5"
                    key=""
                    style={{ width: "18rem" }}
                  >
                    <img src={sellerProductPic} className="card-img-top w-100 h-50" alt="..." />
                    <div className="d-flex" style={{ height: "120px" }}>
                      <div className="card-body ">
                        <h6 className="card-text">{sellerProduct.name} </h6>
                      </div>
                      <div className="productCard-points-box d-flex ">
                        <img src={img2} alt="coin" />
                        <p>{sellerProduct.point}</p>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center">
                      <button
                        className="userDeliverdProducts-viewmore"
                        onClick={() => {
                          navigate(`/user/exchange-items`);
                        }}
                      >
                        view more
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{marginTop:"20px"}}>
      <Footer/>

      </div>
    </div>
  );
};

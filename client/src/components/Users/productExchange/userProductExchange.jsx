import React from "react";
import "./userProductExchange.css";
import { FaHeart } from "react-icons/fa";
import img2 from "../../../assets/images/itemDetailsPoints.png";
import { useState, useEffect } from "react";
import axiosInstance from "../../../apis/axiosInstance";
import { BASE_URL } from "../../../apis/baseURL";
import { useParams } from "react-router-dom";
import UserMainNav from "../UserMainNav";
import Footer from "../../Footer/Footer";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { MyProductModals } from "./myProductModals.jsx";
import { toast } from "react-hot-toast";

export const UserProductExchange = () => {
  const [product, setProduct] = useState(null);
  const [ownerDetails, setOwnerDetails] = useState();
  const [wishList, setWhishList] = useState(false);
  const [show, setShow] = useState(false);
  const [activeUserId, setActiveUserId] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      getProductDetails(id);
    }
  }, []);

  const getProductDetails = async (id) => {
    try {
      const res = await axiosInstance.get(`viewItemById/${id}`);
      if (res.data.status === 200) {
        setProduct(res.data.data);
        setOwnerDetails(res.data.data.userId);
      } else {
        console.log("!get product details", res);
      }
    } catch (error) {
      console.log("!get product details", error);
    }
  };

  const openMyProducts = () => {
    setShow(true);
  };

  const redirectToProductList = () => {
    navigate(-1);
  };
  const clickWishList = () => {
    setWhishList(!wishList);
  };

  useEffect(() => {
    const userId = localStorage.getItem("trade-hub-userId") || null;

    if (userId) {
      setActiveUserId(userId);
    } else {
      toast.error("Please login again.");
      navigate("/user/login");
    }
  }, []);

  const handleConfirmExchange = (buyerProductId) => {
    const data = {
      buyerProductId,
      sellerProductId: product?._id,
      sellerId: product?.userId?._id,
      buyerId: activeUserId,
    };

    const { sellerProductId, sellerId, buyerId } = data;
    if (!buyerProductId || !sellerProductId || !sellerId || !buyerId) {
      toast.error("Please refresh the page and try again.");
      return;
    }

    sendDataToServer(data);
    console.log("my data", data);
  };

  const sendDataToServer = async (data) => {
    try {
      const res = await axiosInstance.post("/sendExchangeRequest", data);
      if (res.status === 201) {
        toast.success("Product exchange requeset sent successfully.");
        setShow(false);
        // todo => navigate to request page
        navigate("/user/requests");
      }
    } catch (error) {
      const status = error?.response?.status;
      if (
        status === 400 ||
        status === 401 ||
        status === 404 ||
        status === 500
      ) {
        toast.error(error?.response?.data?.msg || "Something went wrong.");
        navigate("/user/requests");
      } else {
        toast.error("Network error");
      }

      console.log("Error on product exchange", error);
    }
  };

  return (
    <>
      <UserMainNav />
      <MyProductModals
        show={show}
        handleConfirmExchange={handleConfirmExchange}
        setShow={setShow}
      />

      <div className="itemDeails-body shadow">
        <div className="container text-center pb-4">
          <div className="row">
            <div className="col-md-6 d-flex itemDetails-left-box">
              <div
                className=" mt-5"
                style={{ cursor: "pointer", width: "50px", height: "40px" }}
                onClick={redirectToProductList}
              >
                <FaArrowLeft className="itemDetails-left-arrow" />
              </div>
              <div>
                <img
                  src={`${BASE_URL}${product?.itemPhoto?.filename}`}
                  alt=""
                  className="img-fluid itemdetails-view-product-image"
                />
                <div className="itemDetails-coins-box d-flex">
                  <img src={img2} alt="" className="itemDetails-points-image" />
                  <p> {product?.point}</p>
                </div>
                {wishList && (
                  <FaHeart
                    className="itemdetails-heart"
                    onClick={clickWishList}
                  />
                )}
              </div>
            </div>
            <div className="col-md-6 itemDetails-right-box2 mt-5">
              <h5>{product?.category}</h5>
              <h3>{product?.name}</h3>
              <div className="container ">
                <div className="row itemDetails-right-inner-box">
                  <div className="col-6">
                    <h6>Quantity</h6>
                    <div className="itemDetails-quantity">
                      {product?.quantity}
                    </div>
                    <div></div>
                  </div>
                  <div className="col-6">
                    <h6>Condition</h6>
                    <p>{product?.condition}</p>
                  </div>
                </div>
                <table>
                  <tr>
                    <th>Description</th>
                    <td>:</td>
                    <td>{product?.description}</td>
                  </tr>
                  <tr>
                    <th>Address</th>
                    <td>:</td>
                    <td>{product?.address}</td>
                  </tr>
                  <tr>
                    <th>Location</th>
                    <td>:</td>
                    <td>{product?.location}</td>
                  </tr>
                </table>
              </div>
              <h4>Owner details</h4>
              <div className="Exchange-owner-details row">
                <div className="col-3 mt-3">
                  <img
                    style={{ height: "100px", width: "100px" }}
                    src={`${BASE_URL}${ownerDetails?.profile?.filename}`}
                    alt=""
                  />
                </div>
                <div className="col-9">
                  <table
                    style={{ width: "50%", height: "75%" }}
                    className="mt-3"
                  >
                    <tbody>
                      <tr>
                        <td>Name</td>
                        <td>:</td>
                        <td>{ownerDetails?.firstname}</td>
                      </tr>
                      <tr>
                        <td>contact</td>
                        <td>:</td>
                        <td>{ownerDetails?.contact}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className=" mt-5">
            <button onClick={openMyProducts} className="user-xchange-now-btn">
              Exchange Now
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

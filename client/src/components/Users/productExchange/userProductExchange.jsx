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
import { Button } from "react-bootstrap";
import { MyProductModals } from "./myProductModals.jsx";

export const UserProductExchange = () => {
  const [product, setProduct] = useState(null);
  const [userSelectedProductId, setUserSelectedProductId] = useState("");
  const [wishList, setWhishList] = useState(false);
  const [show, setShow] = useState(false);
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
      } else {
        console.log("!get product details", res);
      }
    } catch (error) {
      console.log("!get product details", error);
    }
  };

  const changeSelectedProductItem = (id) => {
    setUserSelectedProductId(id);
  };
  const openMyProducts = () => {
    setShow(true);
  };

  console.log("product deta", product);
  const redirectToProductList = () => {
    navigate(-1);
  };
  const clickWishList = () => {
    setWhishList(!wishList);
  };
  return (
    <>
      <UserMainNav />
      <MyProductModals
        changeSelectedProductItem={changeSelectedProductItem}
        show={show}
        setShow={setShow}
      />

      <div className="itemDeails-body shadow">
        <div class="container text-center">
          <div class="row">
            <div class="col-md-6 d-flex itemDetails-left-box">
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
            <div class="col-md-6 itemDetails-right-box2 mt-5">
              <h5>{product?.category}</h5>
              <h3>{product?.name}</h3>
              <div class="container ">
                <div class="row itemDetails-right-inner-box">
                  <div class="col-6">
                    <h6>Quantity</h6>
                    <div className="itemDetails-quantity">
                      {product?.quantity}
                    </div>
                    <div></div>
                  </div>
                  <div class="col-6">
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

import React from "react";
import "./modProduct.css";
import { FaHeart } from "react-icons/fa";
import img1 from "../../../assets/images/itemDetails_image1.png";
import img2 from "../../../assets/images/itemDetailsPoints.png";
import { useState, useEffect } from "react";
import axiosInstance from "../../../apis/axiosInstance";
import { BASE_URL } from "../../../apis/baseURL";
import { AssignPointsModal } from "./assignPointsModal";
import { toast } from "react-hot-toast";
import { ApprovedBtn, RejectedBtn } from "../../common/approvedBtn/approvedBtn";
export const ModProductDetails = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [wishList, setWhishList] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    getProductDetails()
    setShow(false)
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (productId) {
      getProductDetails();
    }
  }, []);

  const getProductDetails = async () => {
    try {
      const res = await axiosInstance.get(`/viewItemById/${productId}`);
      if (res.data.status === 200) {
        setProduct(res.data.data);
      } else {
        console.log("!get product details", res);
      }
    } catch (error) {
      console.log("!get product details", error);
    }
  };

  console.log("product deta", product);

  const rejectProduct = async () => {
    console.log("reject");
    try {
      const res = await axiosInstance.get(`itemRejectById/${productId}`);
      if (res.status === 200) {
        toast.success("Item rejected successfully");
      }
      console.log("res", res);
    } catch (error) {
      console.log("Error on reject", error);
    } finally {
      getProductDetails();
    }
  };

  const clickWishList = () => {
    setWhishList(!wishList);
  };

  const addPoint = () => {
    handleShow();
  };
  return (
    <>
      <AssignPointsModal
        show={show}
        handleClose={handleClose}
        ph={product?.userId?.contact}
        itemId={productId}
      />
      <div className="itemDeails-body shadow">
        <div class="container text-center">
          <div class="row">
            <div class="col-md-6 d-flex itemDetails-left-box">
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
            <div className="shadow col-md-6 itemDetails-right-box2 p-3 mt-5">
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
                {product?.isModApproved === "approve" ? (
                  <ApprovedBtn />
                ) : product?.isModApproved === "reject" ? (
                  <RejectedBtn />
                ) : (
                  <div className="itemDetails-button-box2">
                    <button
                      className="text-light bg-danger"
                      onClick={rejectProduct}
                    >
                      Reject Product
                    </button>
                    <button onClick={addPoint}>Add Point</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

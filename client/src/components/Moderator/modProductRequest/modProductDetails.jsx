import React from "react";
import "./modProduct.css";
import { FaHeart } from "react-icons/fa";
import img1 from "../../../assets/images/itemDetails_image1.png";
import img2 from "../../../assets/images/itemDetailsPoints.png";
import { useState, useEffect } from "react";
import axiosInstance from "../../../apis/axiosInstance";
import { BASE_URL } from "../../../apis/baseURL";
export const ModProductDetails = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [wishList, setWhishList] = useState(false);

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

  console.log("product deta", product)
  let productDetails = {
    productType: "Electonics",
    productName: "Airpods",
    quantity: 1,
    condition: "No Damage",
    description:
      "Airpods with 35 hrs Playback,13mm Drivess, bluetooth headset. ",
    Adress: " kazhakootam,trivandrum, kerala,695022.",
    Location: " kazhakootam.",
    points: 100,
  };
  const clickWishList = () => {
    setWhishList(!wishList);
  };
  return (
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
              <div className="itemDetails-button-box">
                <button>Add Point</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

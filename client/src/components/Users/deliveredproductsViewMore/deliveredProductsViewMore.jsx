import React from "react";
import "./deliveredProductsViewMore.css";
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
import { toast } from "react-hot-toast";

export const DeliveredProductsViewMore = () => {
  const [product, setProduct] = useState({});
  const [userId, setUserId] = useState("");
  const [ownerDetails, setOwnerDetails] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const redirectToProductList = () => {
    navigate(-1);
  };
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/viewItemById/${id}`);
      const data = response?.data?.data;
      setProduct(data);
      setOwnerDetails(data.userId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const id = localStorage.getItem("trade-hub-userId") || null;
    if (id) {
      setUserId(id);
    } else {
      toast.error("login again");
    }
  });
  console.log(product, "dsf");

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <UserMainNav />
      <div className="itemDeails-body shadow">
        <div className="container text-center">
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
                  <tr>
                    <th>Listing</th>
                    <td>:</td>
                    <td>{product?.listing}</td>
                  </tr>
                </table>
              </div>
              {userId !== ownerDetails?._id && (
                <>
                  <h4>Owner details</h4>
                  <div className="Exchange-owner-details row">
                    <div className="col-3 my-3">
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
                </>
              )}
            </div>
          </div>

          {/* <div className=" mt-5">
            <button onClick={openMyProducts} className="user-xchange-now-btn">
              Exchange Now
            </button>
          </div> */}
        </div>
      </div>
      <Footer />
    </>
  );
};

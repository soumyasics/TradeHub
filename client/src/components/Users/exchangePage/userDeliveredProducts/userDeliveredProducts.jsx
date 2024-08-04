import img2 from "../../../../assets/images/itemDetailsPoints.png";
import img3 from "../../../../assets/images/userTransactionImage2.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../../../../apis/axiosInstance";
import { BASE_URL } from "../../../../apis/baseURL";
import MainNav from "../../../homeComponents/Navbar/MainNav";
import Footer from "../../../Footer/Footer";
import UserMainNav from "../../UserMainNav";
import { Col, Row } from "react-bootstrap";
import "./userDeliveredProducts.css";

export const UserDeliveredProducts = () => {
  const [activeUserId, setActiveUserId] = useState("");
  const [requestSentByMeExchanges, setRequestSentByMeExchanges] = useState([]);
  const [receivedRequestExchanges, setReceivedRequestExchanges] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("trade-hub-userId") || null;

    if (userId) {
      setActiveUserId(userId);
    } else {
      toast.error("Please login again");
    }
  }, []);
  useEffect(() => {
    if (activeUserId) {
      getRequestByBuyerId();
      getRequestBySellerId();
    }
  }, [activeUserId]);

  const getRequestByBuyerId = async () => {
    try {
      const response = await axiosInstance.get(
        `getAllDeliveredRequestByBuyerId/${activeUserId}`
      );
      if (response.status == 200) {
        let data = response.data.data;
        data = data.reverse();
        setRequestSentByMeExchanges(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getRequestBySellerId = async () => {
    try {
      const response = await axiosInstance.get(
        `getAllDeliveredRequestBySellerId/${activeUserId}`
      );
      if (response.status == 200) {
        let data = response.data.data;
        data = data.reverse();
        setReceivedRequestExchanges(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="productCard-body">
      <UserMainNav />
      <div className="d-flex justify-content-center mt-5">
        <h6 className="user-wishlist-heading3">Delivered items</h6>
      </div>
      {[...requestSentByMeExchanges, ...receivedRequestExchanges].length > 0 ? (
        <>
          <div
            className="row mx-auto"
            style={{ minHeight: "500px", width: "95%" }}
          >
            {[...requestSentByMeExchanges, ...receivedRequestExchanges].map(
              (e) => {
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

                const buyerId = e?.buyerId;
                let isThisReqInitiatedByMe = false;
                if (activeUserId === buyerId._id) {
                  isThisReqInitiatedByMe = true;
                }
                let deliveryStatement = "";
                if (isThisReqInitiatedByMe) {
                  if (e.extraPointReqForBuyer > 0) {
                    deliveryStatement = ` ${e.extraPointReqForBuyer} points were collected from your account and transferred to the other trader.`;
                  }
                  if (e.pointCreditBackToBuyer) {
                    deliveryStatement = ` ${e.pointCreditBackToBuyer} points credited to to your wallet.`;
                  }
                }else {
                  if (e.extraPointReqForBuyer > 0) {
                    deliveryStatement = ` ${e.extraPointReqForBuyer} credited to your wallet.`;
                  }
                }
                return (
                  <div className=" user-delivered-container container text-center mx-0 col-6 ">
                    <div className="row">
                      <div className=" userDeliveryProduct-box shadow row">
                        <div className="card productCard-box3  col-5">
                          <img
                            src={buyerProductPic}
                            className="card-img-top w-75 h-50 ms-3"
                            alt="..."
                          />
                          <div className="" style={{ height: "120px" }}>
                            <Row className="mt-3">
                              <Col>
                                <h6 className="card-text text-center   text-capitalize">
                                  {buyerProduct?.name}{" "}
                                </h6>
                              </Col>
                            </Row>
                            <Row className="mt-3">
                              <Col>
                                <h6 className="card-text text-left   text-capitalize">
                                  Points
                                </h6>
                              </Col>
                              <Col xs={1}>:</Col>
                              <Col className="productCard-points-box2  border-1 d-flex align-items-center juatify-content-center ">
                                <img
                                  style={{ width: "20px" }}
                                  src={img2}
                                  alt="coin"
                                  className="ms-3"
                                />

                                <h6 className="mt-2 ms-1">
                                  {buyerProduct?.point}
                                </h6>
                              </Col>
                            </Row>
                          </div>

                          <div className="d-flex justify-content-center">
                            <button
                              className="userDeliverdProducts-viewmore"
                              onClick={() => {
                                navigate(
                                  `/delivered/products-viewmore/${buyerProduct._id}`
                                );
                              }}
                            >
                              View more
                            </button>
                          </div>
                        </div>

                        <div
                          style={{
                            width: "50px",
                            height: "50px",
                            marginTop: "25%",
                          }}
                          className="col-1"
                        >
                          <img src={img3} alt="icon" className="w-100" />
                        </div>

                        <div className="card productCard-box3 col-5" key="">
                          <img
                            src={sellerProductPic}
                            className="card-img-top w-75 h-50 ms-3"
                            alt="..."
                          />
                          <div className="" style={{ height: "120px" }}>
                            <Row className="mt-3">
                              <Col>
                                <h6 className="card-text text-center   text-capitalize">
                                  {sellerProduct?.name}{" "}
                                </h6>
                              </Col>
                            </Row>
                            <Row className="mt-3">
                              <Col>
                                <h6 className="card-text text-left   text-capitalize">
                                  Points
                                </h6>
                              </Col>
                              <Col xs={1}>:</Col>
                              <Col className="productCard-points-box2  border-1 d-flex align-items-center juatify-content-center ">
                                <img
                                  style={{ width: "20px" }}
                                  src={img2}
                                  alt="coin"
                                  className="ms-3"
                                />

                                <h6 className="mt-2 ms-1">
                                  {sellerProduct?.point}
                                </h6>
                              </Col>
                            </Row>
                          </div>
                          <div className="d-flex justify-content-center">
                            <button
                              className="userDeliverdProducts-viewmore"
                              onClick={() => {
                                navigate(
                                  `/delivered/products-viewmore/${sellerProduct._id}`
                                );
                              }}
                            >
                              View more
                            </button>
                          </div>
                        </div>
                        <div className="delivery-statement my-3">
                          <p> {deliveryStatement}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </>
      ) : (
        <div>
          <h1 className="text-center">No exchanges</h1>
        </div>
      )}
      <div style={{ marginTop: "20px" }}>
        <Footer />
      </div>
    </div>
  );
};

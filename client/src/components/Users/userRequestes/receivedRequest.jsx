import exchange_icon from "../../../assets/images/tabler_exchange.svg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance";
import { BASE_URL } from "../../../apis/baseURL";
import coinImg from "../../../assets/images/itemDetailsPoints.png";
import { BsChatText } from "react-icons/bs";
import "./requests.css";
export const ReceivedRequest = () => {
  const [requests, setRequests] = useState([]);
  const [activeUserId, setActiveUserId] = useState("");
  const navigate = useNavigate();

  const navigateToMyProductDetails = (id) => {
    navigate(`/user/view-items/${id}`);
  };
  const navigateToOtherUserProductDetails = (id) => {
    navigate(`/user/exchange-items/${id}`);
  };
  const getMyRequests = async () => {
    try {
      const res = await axiosInstance.get(
        `getAllRequestBySellerId/${activeUserId}`
      );
      if (res.status == 200) {
        let pendingReqs = res.data.data.filter(
          (e) => e?.sellerResponseStatus === "pending"
        );
        pendingReqs=  pendingReqs.reverse()

        setRequests(pendingReqs);
      }
    } catch (error) {
      const status = error?.response.status;
      if (status === 400 || status === 404 || status === 500) {
        toast.error(error.response?.data?.msg || "Network issue");
      } else {
        toast.error("Something went wrong");
      }
      console.log("Error on get my requests =>", error);
    }
  };
  useEffect(() => {
    const userId = localStorage.getItem("trade-hub-userId") || null;
    if (userId) {
      setActiveUserId(userId);
    }
  }, []);
  useEffect(() => {
    if (activeUserId) {
      getMyRequests();
    }
  }, [activeUserId]);

  const acceptRequest = async (id) => {
    console.log("id => ", id);
    try {
      const res = await axiosInstance.patch(`acceptRequestById/${id}`);
      if (res.status === 200) {
        toast.success(res.data.msg);
      }
    } catch (error) {
      const status = error?.response.status;
      if (status === 400 || status === 404 || status === 500) {
        toast.error(error.response?.data?.msg || "Network issue");
      } else {
        toast.error("Something went wrong");
      }
      console.log("Error on acceptRequest =>", error);
    } finally {
      getMyRequests();
    }
  };
  const rejectRequest = async (id) => {
    try {
      const res = await axiosInstance.patch(`rejectRequestById/${id}`);
      if (res.status === 200) {
        toast.success(res.data.msg);
      }
    } catch (error) {
      const status = error?.response.status;
      if (status === 400 || status === 404 || status === 500) {
        toast.error(error.response?.data?.msg || "Network issue");
      } else {
        toast.error("Something went wrong");
      }
      console.log("Error on acceptRequest =>", error);
    } finally {
      getMyRequests();
    }
  };

  return (
    <div className="mt-5">
      <div className="text-center">
        <h3>Received Requests</h3>
      </div>

      <div className="exchangeproduct-main">
        {requests.map((e, i) => {
          const buyerProduct = e?.buyerProductId;
          const buyerProductFilename =
            buyerProduct?.itemPhoto?.filename || null;
          let buyProductPic =
            "https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg";
          if (buyerProductFilename) {
            buyProductPic = `${BASE_URL}${buyerProductFilename}`;
          }

          const sellerProduct = e?.sellerProductId;
          const sellerProductFilename =
            sellerProduct?.itemPhoto?.filename || null;
          let sellProductPic =
            "https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg";
          if (sellerProductFilename) {
            sellProductPic = `${BASE_URL}${sellerProductFilename}`;
          }
          return (
            <div key={i} className="exchangeproduct-box">
              <div className="exchangeproduct-boxcontent d-flex">
                {/* myitems */}
                <div className="exchangeproduct-myitems">
                  <div className="exchangeproduct-myitems-head">My Item</div>

                  <div className="exchangeproduct-receiveditems-photo">
                    <img src={sellProductPic} alt="Product Image" />
                  </div>

                  <div className="exchangeproduct-myitems-detail">
                    <table>
                      <tbody style={{ height: "215px" }}>
                        <tr>
                          <td style={{ fontWeight: "600" }}>Item name</td>
                          <td>:</td>
                          <td>{sellerProduct.name}</td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "600" }}>Category</td>
                          <td>:</td>
                          <td>{sellerProduct.category}</td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "600" }}>Quantity</td>
                          <td>:</td>
                          <td>{sellerProduct.quantity}</td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "600" }}>Description</td>
                          <td>:</td>
                          <td>{sellerProduct.description} </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="productCard-points-box d-flex ">
                              <img src={coinImg} alt="coin" />
                              <p>{sellerProduct?.point}</p>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <span className="viewmore">
                      <button
                        onClick={() => {
                          navigateToMyProductDetails(sellerProduct._id);
                        }}
                      >
                        View more
                      </button>
                    </span>
                  </div>
                </div>

                <div className="exchange-icon">
                  <img src={exchange_icon} alt="" />
                </div>

                {/* receiveditem */}

                <div className="exchangeproduct-receiveditems">
                  <div className="exchangeproduct-receiveditems-head">
                    Received request
                  </div>
                  <div className="exchangeproduct-myitems-photo">
                    <img src={buyProductPic} alt="Product Image" />
                  </div>

                  <div className="exchangeproduct-receiveditems-detail">
                    <table>
                      <tbody style={{ height: "215px" }}>
                        <tr>
                          <td style={{ fontWeight: "600" }}>Item name</td>
                          <td>:</td>
                          <td>{buyerProduct?.name}</td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "600" }}>Category</td>
                          <td>:</td>
                          <td>{buyerProduct?.category}</td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "600" }}>Quantity</td>
                          <td>:</td>
                          <td>{buyerProduct.quantity}</td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "600" }}>Description</td>
                          <td>:</td>
                          <td>{buyerProduct?.description}</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="productCard-points-box d-flex ">
                              <img src={coinImg} alt="coin" />
                              <p>{buyerProduct?.point}</p>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <span className="viewmore">
                      <button
                        onClick={() => {
                          navigateToOtherUserProductDetails(buyerProduct._id);
                        }}
                      >
                        View more
                      </button>
                    </span>
                  </div>
                </div>
                <div className="exchangeProduct-order-pending">
                  <input type="radio" />
                  Pending
                </div>
                <div className="exchangeProduct-chat-btn">
                  <button>
                  <BsChatText /> &nbsp; 
                  Chat
                  </button>
                </div>
              </div>
              <span className="justify-content-center mt-2 d-flex">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => {
                    acceptRequest(e._id);
                  }}
                >
                  Accept
                </button>
                <button
                  type="button"
                  className="btn ms-5 btn-danger"
                  onClick={() => {
                    rejectRequest(e._id);
                  }}
                >
                  Reject
                </button>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

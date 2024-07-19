import img1 from "../../../assets/images/itemDetailsPoints.png";
import img2 from "../../../assets/images/userTransactionImage.png";
import img3 from "../../../assets/images/userTransactionImage2.svg";
import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance";
import { GiConsoleController } from "react-icons/gi";
import { BASE_URL } from "../../../apis/baseURL";
import "./approvedExchangeProduct.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const ApprovedExchangeProduct = () => {
  const [activeUserId, setActiveUserId] = useState("");
  const [exchangeData, setExchangeData] = useState([]);
  const Navigate = useNavigate();
  const getApprovedProduct = async () => {
    try {
      const response = await axiosInstance.get(
        `getAllApprovedExchangesBySellerId/${activeUserId}`
      );
      if (response.status == 200) {
        console.log(response);
        setExchangeData(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("trade-hub-userId") || null;
    if (userId) {
      setActiveUserId(userId);
    } else {
      toast.error("Please login again");
      Navigate("/user/login");
    }
  }, []);

  useEffect(() => {
    if (activeUserId) {
      getApprovedProduct();
    }
  }, [activeUserId]);
  return (
    <div className="userTransaction-main">
      <div className="userViewTransaction-heading-box">
        Approved Exchange product{" "}
      </div>
      {exchangeData.map((e) => {
        const buyerProductId = e.buyerProductId;
        const buyerPic = buyerProductId?.itemPhoto?.filename;
        let buyerProductUrl =
          "https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg";

        if (buyerPic) {
          buyerProductUrl = `${BASE_URL}${buyerPic}`;
        }
        const sellerProductId = e.sellerProductId;
        const sellerPic = sellerProductId?.itemPhoto?.filename;
        let sellerProductUrl =
          "https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg";

        if (sellerPic) {
          sellerProductUrl = `${BASE_URL}${sellerPic}`;
        }
        return (
          <div>
            <div className="exchange-Transaction-inner-box">
              <div>
                <div className="exchange-Transaction-box " >
                  <div className="userTransaction-boxcontent d-flex">
                    {/* myitems */}
                    <div className="userTransaction-myitems">
                      <div className="userTransaction-myitems-head">
                        My items
                      </div>
                      <div className="userTransaction-myitems-photo">
                        {/* <img src={e.productPhoto} alt="Product Image" /> */}
                      </div>
                      <div className="userTransaction-myitems-detail">
                        <table>
                          <tbody>
                            <tr>
                              <th style={{ fontWeight: "600" }}>item name</th>
                              <td>:</td>
                              <td> {buyerProductId.name}</td>
                            </tr>
                            <tr>
                              <th style={{ fontWeight: "600" }}>category</th>
                              <td>:</td>
                              <td>{buyerProductId.category} </td>
                            </tr>
                            <tr>
                              <th style={{ fontWeight: "600" }}>Description</th>
                              <td>:</td>
                              <td> {buyerProductId.description}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="userTransaction-receiveditems">
                      <div className="userTransaction-receiveditems-photo">
                        {/* <img src={e.productPhoto} alt="Product Image" /> */}
                      </div>
                    </div>
                    <div className="modTransaction-right-image">
                      <img src={buyerProductUrl} alt="" />
                    </div>
                  </div>
                  {/* <div style={{ width: "30px", height: "30px" }} >
                  <img src={img3} alt="icon" className="w-100" />
                </div> */}

                 
<div className="d-flex mt-5 justify-content-between d-flex">
                    <div className=" d-flex">
                      Seller response status :
                      {e?.sellerResponseStatus === "pending" ? (
                        <p className="text-warning">Pending</p>
                      ) : e?.sellerResponseStatus == "accepted" ? (
                        <p className="text-success">Accepted</p>
                      ) : (
                        <p className="text-danger">Rejected</p>
                      )}
                    </div>
                    <div style={{ width: "30px", height: "30px" }}>
                      <img src={img3} alt="icon" className="w-100" />
                    </div>
                    <div className="d-flex">
                      Delivery status :
                      {e?.deliveryStatus === "pending" ? (
                        <p className="text-warning">Pending</p>
                      ) : e?.deliveryStatus == "accepted" ? (
                        <p className="text-success">Accepted</p>
                      ) : (
                        <p className="text-danger">Rejected</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="exchange-Transaction-box2">
                  <div className="userTransaction-boxcontent d-flex">
                    {/* myitems */}
                    <div className="userTransaction-myitems">
                      <div className="userTransaction-myitems-head">
                        Received request
                      </div>
                      <div className="userTransaction-myitems-photo">
                        {/* <img src={e.productPhoto} alt="Product Image" /> */}
                      </div>
                      <div className="userTransaction-myitems-detail">
                        <table>
                          <tbody>
                            <tr>
                              <th style={{ fontWeight: "600" }}>item name</th>
                              <td>:</td>
                              <td>{sellerProductId.name} </td>
                            </tr>
                            <tr>
                              <th style={{ fontWeight: "600" }}>Category</th>
                              <td>:</td>
                              <td>{sellerProductId.category}</td>
                            </tr>
                            <tr>
                              <th style={{ fontWeight: "600" }}>Description</th>
                              <td>:</td>
                              <td>{sellerProductId.description}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {/* receiveditem */}
                    <div className="userTransaction-receiveditems "></div>{" "}
                    <div className="modTransaction-right-image">
                      <img src={sellerProductUrl} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

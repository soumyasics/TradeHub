import img1 from "../../../assets/images/airpods1.png";
import { useEffect, useState } from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import axiosInstance from "../../../apis/axiosInstance";
import { First } from "react-bootstrap/esm/PageItem";
import { BASE_URL } from "../../../apis/baseURL";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import "./deliveredOrders.css";
export const DeliveredOrders = () => {
  const [deliveryAgentId, setDeliveryAgentId] = useState("");
  const [exchangeId, setExchangeId] = useState("");
  const [deliveredData, setDeliveredData] = useState([]);

  useEffect(() => {
    const id = localStorage.getItem("trade-hub-DAId") || null;
    if (id) {
      setDeliveryAgentId(id);
    } else {
      toast.error("login again");
    }
  });
  useEffect(() => {
    getDeliveredOrders();
  });

  const getDeliveredOrders = async () => {
    try {
      const response = await axiosInstance.get(
        `/getAllDeliveredOrdersByDeliveryAgentId/${deliveryAgentId}`
      );
      if (response.status == 200) {
        setDeliveredData(response.data.data);
      }
    } catch (error) {}
  };

  return (
    <div className="delivery-viewItems-body">
      <div className="delivery-viewItems-body">
        <h1 className="delivery-viewItems-heading text-center">
          Delivered orders
        </h1>
        {deliveredData.map((e) => {
          const buyerId = e?.buyerId;
          const buyerProductId = e?.buyerProductId;
          const buyerProductFilename =
            buyerProductId?.itemPhoto?.filename || null;
          let buyerProductPic =
            "https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg";
          if (buyerProductFilename) {
            buyerProductPic = `${BASE_URL}${buyerProductFilename}`;
          }
          const sellerId = e?.sellerId;
          const sellerProductId = e?.sellerProductId;

          const sellerProductFilename =
            sellerProductId?.itemPhoto?.filename || null;
          let sellerProductPic =
            "https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg";
          if (sellerProductFilename) {
            sellerProductPic = `${BASE_URL}${sellerProductFilename}`;
          }

          return (
            <div key={e._id} className="deliveryAcceptOrder-outer-box">
              <div style={{ cursor: "pointer" }}>
                <div className="delivery-pending-viewItems-box">
                  <div className="container text-center">
                    <div className="row">
                      <div className="col-4 delivery-viewItems-left-box">
                        <img
                          style={{ width: "50%" }}
                          src={buyerProductPic}
                          alt="Item"
                        />
                      </div>
                      <div className="col-6 delivery-viewItems-middle-box">
                        <table>
                          <thead>
                            <tr>
                              <td>Items name</td>
                              <td>:</td>
                              <td className="delivery-view_Items-data">
                                {buyerProductId.name}
                              </td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Customer name</td>
                              <td>:</td>
                              <td className="delivery-view_Items-data">
                                {buyerId.firstname} {buyerId.lastname}
                              </td>
                            </tr>
                            <tr>
                              <td>Phone number</td>
                              <td>:</td>
                              <td className="delivery-view_Items-data">
                                {buyerId.contact}
                              </td>
                            </tr>
                            <tr>
                              <td>Condition</td>
                              <td>:</td>
                              <td className="delivery-view_Items-data">
                                {buyerProductId.condition}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="col-2 delivery-viewItems-right-box">
                        <div className="deliveryView-right-inner-box2">
                        <div className="myDelivered-Delivered-box d-flex">
                          <p>Delivered</p>
                          <CiDeliveryTruck className="mydelivered-delivered-icon" />
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ cursor: "pointer" }}>
                <div className="delivery-pending-viewItems-box">
                  <div className="container text-center">
                    <div className="row">
                      <div className="col-4 delivery-viewItems-left-box">
                        <img
                          style={{ width: "50%" }}
                          src={sellerProductPic}
                          alt="Item"
                        />
                      </div>
                      <div className="col-6 delivery-viewItems-middle-box">
                        <table>
                          <thead>
                            <tr>
                              <td>Items name</td>
                              <td>:</td>
                              <td className="delivery-view_Items-data">
                                {sellerProductId.name}
                              </td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Customer name</td>
                              <td>:</td>
                              <td className="delivery-view_Items-data">
                                {sellerId.firstname} {sellerId.lastname}
                              </td>
                            </tr>
                            <tr>
                              <td>Phone number</td>
                              <td>:</td>
                              <td className="delivery-view_Items-data">
                                {sellerId.contact}
                              </td>
                            </tr>
                            <tr>
                              <td>Condition</td>
                              <td>:</td>
                              <td className="delivery-view_Items-data">
                                {sellerProductId.condition}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="col-2 delivery-viewItems-right-box">
                        <div className="deliveryView-right-inner-box2">
                        <div className="myDelivered-Delivered-box d-flex">
                          <p>Delivered</p>
                          <CiDeliveryTruck className="mydelivered-delivered-icon" />
                        </div>
   
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

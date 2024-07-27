import "./deliveryPending.css";
import img1 from "../../../assets/images/airpods1.png";
import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance";
import { First } from "react-bootstrap/esm/PageItem";
import { BASE_URL } from "../../../apis/baseURL";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
export const DeliveryPending = () => {
  const [acceptData, setAcceptData] = useState([]);
  const [deliveryAgentId, setDeliveryAgentId] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    let id = localStorage.getItem("trade-hub-DAId") || null;
    if (id) {
      setDeliveryAgentId(id);
    } else {
      toast.error("Please login again.");
      navigate("/delivery/login");
    }
  }, []);

  const getItems = async () => {
    try {
      const response = await axiosInstance.get(
        `getAllAcceptedOrdersByDeliveryAgentId/${deliveryAgentId}`
      );
      if (response.status == 200) {
        console.log("data respon", response);
        setAcceptData(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (deliveryAgentId) {
      getItems();
    }
  }, [deliveryAgentId]);

  const handleDelivery = (exchangeId) => {
    let id = localStorage.getItem("trade-hub-DAId") || null;
    setDeliveryAgentId(id);
    confirmDelivery(exchangeId);
  };

  const confirmDelivery = async (exchangeId) => {
    try {
      if (exchangeId && deliveryAgentId) {
        console.log("product id", exchangeId);
        console.log("agent id", deliveryAgentId);

        const response = await axiosInstance.patch(
          `/deliveredProduct/${exchangeId}`,
          { deliveryAgentId }
        );
        if (response.status == 200) {
          toast.success("Delivery confirmed successfully.");
          getItems()
        }
      } else {
        toast.error("Somthing went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="delivery-viewItems-body">
      <div className="delivery-viewItems-body">
        <h1 className="delivery-viewItems-heading text-center">
          Pending orders
        </h1>
        {acceptData.map((e) => {
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
                      <div className="col-5 delivery-viewItems-middle-box">
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
                      <div className="col-3 delivery-viewItems-right-box">
                        <div className="deliveryView-right-inner-box">
                          <div className="deliveryItemView-pending bg-danger"></div>
                          <p className="delivery-view-item-acceted">Pending</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="delivery-pending-delivered-button"
                onClick={() => {
                  const exchangeId = e?._id;
                  handleDelivery(exchangeId);
                }}
              >
                Confirm delivery
              </button>
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
                      <div className="col-5 delivery-viewItems-middle-box">
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
                      <div className="col-3 delivery-viewItems-right-box">
                        <div className="deliveryView-right-inner-box">
                          <div className="deliveryItemView-pending bg-danger"></div>
                          <p className="delivery-view-item-acceted">pending</p>
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

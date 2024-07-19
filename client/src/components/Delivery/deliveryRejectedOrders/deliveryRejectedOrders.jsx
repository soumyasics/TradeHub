import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance";
import img1 from "../../../assets/images/airpods1.png";
import { BASE_URL } from "../../../apis/baseURL";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
export const DeliveryRejectedOrders = () => {
  const [rejectData, setRejectData] = useState([]);
  const [deliveryAgentId, setDeliveryAgentId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let id = localStorage.getItem("trade-hub-DAId") || null;
    if (id) {
      setDeliveryAgentId(id);
    } else {
      toast.error("Please login again.");
      navigate("/delivery/login");
    }
  }, []);

  const getData = async () => {
    try {
      const response = await axiosInstance.get(
        `getAllRejectedOrdersByDeliveryAgentId/${deliveryAgentId}`
      );
      if (response.status == 200) {
        setRejectData(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (deliveryAgentId) {
      getData();
    }
  }, [deliveryAgentId]);
  return (
    <div>
      <div className="delivery-viewItems-body">
        <h1 className="delivery-viewItems-heading text-center">
          Rejected orders
        </h1>
        {rejectData.map((e) => {
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
            <div className="deliveryAcceptOrder-outer-box">
              <div style={{ cursor: "pointer" }}>
                <div className="delivery-viewItems-box">
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
                                {buyerId.condition}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="col-3 delivery-viewItems-right-box">
                        <div className="deliveryView-right-inner-box">
                          <div className="deliveryItemView-pending bg-danger"></div>
                          <p className="delivery-view-item-acceted">Rejected</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ cursor: "pointer" }}>
                <div className="delivery-viewItems-box">
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
                                {sellerProductId.firstname}{" "}
                                {sellerProductId.lastname}
                              </td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Customer name</td>
                              <td>:</td>
                              <td className="delivery-view_Items-data"></td>
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
                          <p className="delivery-view-item-acceted">Rejected</p>
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

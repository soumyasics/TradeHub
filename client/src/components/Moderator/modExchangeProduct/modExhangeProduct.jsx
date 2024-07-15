import "./modExchangeProduct.css";
import img1 from "../../../assets/images/itemDetailsPoints.png";
import img2 from "../../../assets/images/userTransactionImage.png";
import img3 from "../../../assets/images/userTransactionImage2.svg";
import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance";
import { GiConsoleController } from "react-icons/gi";
import { BASE_URL } from "../../../apis/baseURL";

export const ModExchangeProduct = () => {
  const [requestData, setRequestData] = useState([]);
  const getRequest = async () => {
    try {
      const response = await axiosInstance.get("getAllExchangeRequests");
      if (response.status == 200) {
        console.log("fdgd", response.data.data);
        setRequestData(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(requestData);

  useEffect(() => {
    getRequest();
  }, []);

  return (
    <div>
      {requestData.map((e) => {
        const buyer = e?.buyerId;
        const buyerProduct = e?.buyerProductId;
        const buyerProductFilename = buyerProduct?.itemPhoto?.filename || null;
        let buyerProductPic =
          "https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg";
        if (buyerProductFilename) {
          buyerProductPic = `${BASE_URL}${buyerProductFilename}`;
        }

        const seller = e?.sellerId;
        const sellerProduct = e?.sellerProductId;

        const sellerProductFilename = buyerProduct?.itemPhoto?.filename || null;
        let sellerProductPic =
          "https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg";
        if (sellerProductFilename) {
          sellerProductPic = `${BASE_URL}${buyerProductFilename}`;
        }

        return (
          <div>
            <div className="userTransaction-main">
              <div>
                <div className="userTransaction-box">
                  <div className="userTransaction-boxcontent d-flex">
                    {/* myitems */}
                    <div className="userTransaction-myitems">
                      <div className="userTransaction-myitems-head">User 1</div>
                      <div className="userTransaction-myitems-photo">
                        {/* <img src={e.productPhoto} alt="Product Image" /> */}
                      </div>
                      <div className="userTransaction-myitems-detail">
                        <table>
                          <tbody>
                            <tr>
                              <th style={{ fontWeight: "600" }}>Name</th>
                              <td>:</td>
                              <td>{buyer?.firstname}</td>
                            </tr>
                            <tr>
                              <th style={{ fontWeight: "600" }}>Contact</th>
                              <td>:</td>
                              <td>{buyer?.contact}</td>
                            </tr>
                            <tr>
                              <th style={{ fontWeight: "600" }}>Adress</th>
                              <td>:</td>
                              <td>{buyerProduct?.address}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* receiveditem */}

                    <div className="userTransaction-receiveditems">
                      <div className="userTransaction-receiveditems-head">
                        Product details
                      </div>
                      <div className="userTransaction-receiveditems-photo">
                        {/* <img src={e.productPhoto} alt="Product Image" /> */}
                      </div>
                      <div className="userTransaction-receiveditems-detail">
                        <table>
                          <tbody>
                            <tr>
                              <th style={{ fontWeight: "600" }}>Item name</th>
                              <td>:</td>
                              <td>{buyerProduct?.name}</td>
                            </tr>
                            <tr>
                              <th style={{ fontWeight: "600" }}>Category</th>
                              <td>:</td>
                              <td>{buyerProduct?.category}</td>
                            </tr>
                            <tr>
                              <th style={{ fontWeight: "600" }}>Condition</th>
                              <td>:</td>
                              <td> {buyerProduct?.condition}</td>
                            </tr>
                            <tr>
                              <th style={{ fontWeight: "600" }}>Points</th>
                              <td>:</td>
                              <td>
                                <div className="userTransaction-point-box d-flex">
                                  <img src={img1} alt="" />
                                  <p>{buyerProduct?.point}</p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="modTransaction-right-image">
                      <img src={buyerProductPic} alt="" />
                    </div>
                  </div>
                  <div className="userTransaction-center-image">
                    <img src={img3} alt="" />
                  </div>
                </div>

                <div className="userTransaction-box">
                  <div className="userTransaction-boxcontent d-flex">
                    {/* myitems */}
                    <div className="userTransaction-myitems">
                      <div className="userTransaction-myitems-head">User 2</div>
                      <div className="userTransaction-myitems-photo">
                        {/* <img src={e.productPhoto} alt="Product Image" /> */}
                      </div>
                      <div className="userTransaction-myitems-detail">
                        <table>
                          <tbody>
                            <tr>
                              <th style={{ fontWeight: "600" }}>Name</th>
                              <td>:</td>
                              <td>{seller?.firstname}</td>
                            </tr>
                            <tr>
                              <th style={{ fontWeight: "600" }}>Contact</th>
                              <td>:</td>
                              <td>{seller?.contact}</td>
                            </tr>
                            <tr>
                              <th style={{ fontWeight: "600" }}>Adress</th>
                              <td>:</td>
                              <td>{sellerProduct?.address}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {/* receiveditem */}
                    <div className="userTransaction-receiveditems ">
                      <div className="userTransaction-receiveditems-head">
                        Product details
                      </div>
                      <div className="userTransaction-receiveditems-detail">
                        <table>
                          <tbody>
                            <tr>
                              <th style={{ fontWeight: "600" }}>Item name</th>
                              <td>:</td>
                              <td>{sellerProduct?.name}</td>
                            </tr>
                            <tr>
                              <th style={{ fontWeight: "600" }}>Category</th>
                              <td>:</td>
                              <td>{sellerProduct.category}</td>
                            </tr>
                            <tr>
                              <th style={{ fontWeight: "600" }}>Condition</th>
                              <td>:</td>
                              <td> {sellerProduct?.condition}</td>
                            </tr>
                            <tr>
                              <th style={{ fontWeight: "600" }}>Points</th>
                              <td>:</td>
                              <td>
                                <div className="userTransaction-point-box d-flex">
                                  <img src={img1} alt="" />
                                  <p>{sellerProduct.point}</p>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>{" "}
                    <div className="modTransaction-right-image">
                      <img src={sellerProductPic} alt="" />
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

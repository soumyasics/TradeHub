import "./modProductRequest.css";
import ModeratorSidebar from "../moderatorSidebar/moderatorSidebar";
import productImg from "../../../assets/images/productImg.jpeg";
import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance";
import { BASE_URL } from "../../../apis/baseURL";
import { useNavigate } from "react-router-dom";
export const ModProductRequest = ({updateProductId}) => {

  const [pendingItems, setPendingItems] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    getPendingItems();
  }, []);
  const getPendingItems = (id) => {
    axiosInstance
      .get(`viewAllPendingItems`)
      .then((res) => {
        if (res.status === 200) {
          let data = res?.data?.data || [];
          data.reverse();
          setPendingItems(data);
        } else {
          console.log("view user by id", res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="productrequest-main">
        <div className="productrequest-head text-center">
          {pendingItems.length === 0 ? (
            <h2>No pending product request</h2>
          ) : (
            <h2>Pending product request</h2>
          )}
        </div>
        <div
          className="container"
          style={{ overflowY: "scroll", height: "80vh" }}
        >
          <div className="row">
            {pendingItems.map((e) => {
              const filename = e.itemPhoto?.filename || "";
              let pic;
              if (filename) {
                pic = `${BASE_URL}${filename}`;
              }
              
              return (
                <div className="productrequest-box2 col-md-5 mt-5" onClick={() => {
                //    navigate(`/moderator/product/${e?._id}`)
                updateProductId(e?._id)
                }}>
                  <div className="productImg">
                    <img style={{ width: "100%" }} src={pic} alt="product" />
                  </div>
                  <div className="productDetails2">
                    <table>
                      <tr>
                        <td>Item name</td>
                        <td>:</td>
                        <td>{e?.name?.substring(0, 30)}</td>
                      </tr>
                      <tr>
                        <td>Category</td>
                        <td>:</td>
                        <td>{e?.category}</td>
                      </tr>
                      <tr>
                        <td>Description</td>
                        <td>:</td>
                        <td>{e?.description?.substring(0, 30)}</td>
                      </tr>
                      <tr>
                        <td>Conditon</td>
                        <td>:</td>
                        <td>{e?.condition}</td>
                      </tr>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

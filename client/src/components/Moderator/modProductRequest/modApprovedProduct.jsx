import "./modProductRequest.css";
import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance";
import { BASE_URL } from "../../../apis/baseURL";
import { useNavigate } from "react-router-dom";
import { ApprovedBtn, RejectedBtn } from "../../common/approvedBtn/approvedBtn";
export const ModApprovedProduct = ({ updateProductId }) => {
  const [rejectedItems, setRejectedItems] = useState([]);
  useEffect(() => {
    getRejectedItems();
  }, []);
  const getRejectedItems = (id) => {
    axiosInstance
      .get(`viewAllApproveItems`)
      .then((res) => {
        if (res.status === 200) {
          let data = res?.data?.data || [];
          data.reverse();
          setRejectedItems(data);
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
          {rejectedItems.length === 0 ? (
            <h2>No Approved product found.</h2>
          ) : (
            <h2>Approved products</h2>
          )}
        </div>
        <div
          className="container"
          style={{ overflowY: "scroll", height: "80vh" }}
        >
          <div className="row">
            {rejectedItems.map((e) => {
              const filename = e.itemPhoto?.filename || "";
              let pic;
              if (filename) {
                pic = `${BASE_URL}${filename}`;
              }

              return (
                <div
                  key={e._id}
                  className="productrequest-box2 col-md-5 mt-5"
                  onClick={() => {
                    //    navigate(`/moderator/product/${e?._id}`)
                    updateProductId(e?._id);
                  }}
                >
                  <div className="productImg">
                    <img style={{ width: "100%" }} src={pic} alt="product" />
                  </div>
                  <div className="productDetails2">
                    <table className="w-100">
                      <tbody>
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
                      </tbody>
                    </table>
                    <div className="mx-auto mt-3 w-100 d-flex justify-content-center">
                      <ApprovedBtn />
                    </div>
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

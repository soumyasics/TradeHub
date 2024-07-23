import "./modProductRequest.css";
import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance";
import { BASE_URL } from "../../../apis/baseURL";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { IoSearch } from "react-icons/io5";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { RejectedBtn } from "../../common/approvedBtn/approvedBtn";
export const ModRejectedProduct = ({ updateProductId }) => {
  const [rejectedItems, setRejectedItems] = useState([]);
  const [fixedData, setFixedData] = useState([]);

  useEffect(() => {
    getRejectedItems();
  }, []);
  const getRejectedItems = (id) => {
    axiosInstance
      .get(`viewAllRejectItems`)
      .then((res) => {
        if (res.status === 200) {
          let data = res?.data?.data || [];
          data.reverse();
          setRejectedItems(data);
          setFixedData(data);
        } else {
          console.log("view user by id", res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlechange = (e) => {
    const value = e.target.value;
    console.log("value", value);

    console.log("fix", fixedData);
    if (value) {
      const filterData = fixedData.filter((items) => {
        return items?.name?.toLowerCase().includes(value.toLowerCase());
      });
      setRejectedItems(filterData);
    } else {
      return setRejectedItems(fixedData);
    }
  };

  return (
    <div>
      <div className="productrequest-main">
        <div className="productrequest-head text-center">
          {rejectedItems.length === 0 ? (
            <h2>No rejected product found.</h2>
          ) : (
            <div>
              <h2>Rejected products</h2>
              <InputGroup className="mod-product-request-box1 ms-2 ps-3 ">
                <Form.Control
                  className="mod-product-request-inp"
                  type="text"
                  name="search"
                  aria-label="search"
                  placeholder="Search moderator"
                  aria-describedby="basic-addon1"
                  onChange={handlechange}
                />
                <InputGroup.Text
                  id="basic-addon1"
                  className="modproduct-req-search-box"
                >
                  <IoSearch className="mod-product-request-search-icon" />
                </InputGroup.Text>
              </InputGroup>
            </div>
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
                      <RejectedBtn />
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

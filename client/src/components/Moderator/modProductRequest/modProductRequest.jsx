import "./modProductRequest.css";
import Form from "react-bootstrap/Form";
import { IoSearch } from "react-icons/io5";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import ModeratorSidebar from "../moderatorSidebar/moderatorSidebar";
import productImg from "../../../assets/images/productImg.jpeg";
import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance";
import { BASE_URL } from "../../../apis/baseURL";
import { useNavigate } from "react-router-dom";
export const ModProductRequest = ({ updateProductId, title = "" }) => {
  const [pendingItems, setPendingItems] = useState([]);
  const [fixedItems, setFixedItems] = useState([])
  const [searchCategory, setSearchCategory] = useState("")
  const navigate = useNavigate();
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
          setFixedItems(data);
          setPendingItems(data);
        } else {
          console.log("view user by id", res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchByName = (e) => {
    const value = e.target.value;
    if (value) {
      const filteredItems = fixedItems.filter((item) => {
        return item.name.toLowerCase().includes(value.toLowerCase());
      })
      setPendingItems(filteredItems)
    }else {
      setPendingItems(fixedItems)
    }
  }

  const filterByCategory = (e) => {
    const category = e.target.value;
    if (category) {
      const filteredItems = fixedItems.filter((item) => {
        return item.category === category
      })
      setPendingItems(filteredItems)

    }else {
      setPendingItems(fixedItems)
    }
  }


  return (
    <div>
      <div className="productrequest-main">
        <div className="productrequest-head text-center">
          {pendingItems.length === 0 ? (
            <h2>No pending product request</h2>
          ) : (
            <h2>{title}</h2>
          )}
        </div>
        <div className="justify-content-between d-flex">
          <Form.Select
            aria-label="Default select example"
            className="mod-product-request-category"
            onChange={filterByCategory}
          >
            <option value="">Filter by category</option>
            <option value="Books">Books</option>
            <option value="Electronics">Electronics</option>
            <option value="Jewellery">Jewellery</option>
            <option value="Home Appliances">Home Appliances</option>
            <option value="Clothing">Clothing</option>
          </Form.Select>

          <InputGroup className="mod-product-request-box ms-2 ps-3 ">
            <Form.Control
              className="mod-product-request-inp"
              type="text"
              name="search"
              aria-label="search"
              placeholder="Search product"
              onChange={searchByName}
              aria-describedby="basic-addon1"
            />
            <InputGroup.Text
              id="basic-addon1"
              className="modproduct-req-search-box"
            >
            <IoSearch  className="mod-product-request-search-icon" />
            </InputGroup.Text>
          </InputGroup>
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
                <div
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

import "./viewItems.css";
import img2 from "../../../../assets/images/userViewItemsDelete.svg";
import UserMainNav from "../../UserMainNav";
import Footer from "../../../Footer/Footer";
// import { toast } from "react-hot-toast";
import axiosInstance from "../../../../apis/axiosInstance";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../../apis/baseURL";
import { useNavigate } from "react-router-dom";
import { DeleteModal } from "./deleteItem";
import { IoSearch } from "react-icons/io5";
import InputGroup from "react-bootstrap/InputGroup";
import { Form } from "react-bootstrap";
export const ViewItems = () => {
  const navigate = useNavigate();
  const [myItems, setMyItems] = useState([]);
  const [show, setShow] = useState(false);
  const [deletingItemId, setDeletingId] = useState(null);
  const handleShow = () => setShow(true);
  const [countDelete, setCountDelete] = useState(0);
  const [fixedData, setFixedData] = useState([]);

  const updateCount = () => {
    setCountDelete((prev) => prev + 1);
  };
  useEffect(() => {
    let id = localStorage.getItem("trade-hub-userId") || null;
    console.log("iddd", id);
    if (id) {
      getItems(id);
    } else {
      // toast.error("Please login again.");
      navigate("/user/login");
    }
  }, [countDelete]);

  const getItems = (id) => {
    axiosInstance
      .get(`viewAllitemsByUserId/${id}`)
      .then((res) => {
        if (res.status === 200) {
          let data = res?.data?.data || [];
          data.reverse();
          setMyItems(data);
          setFixedData(data);
        } else {
          console.log("view user by id", res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const viewProductDetails = (id) => {
    navigate(`/user/view-items/${id}`);
  };

  const handlechange = (e) => {
    const value = e.target.value;
    if (value) {
      const filterData = fixedData.filter((items) => {
        return items?.name?.toLowerCase().includes(value.toLowerCase());
      });
      setMyItems(filterData);
    } else {
      return setMyItems(fixedData);
    }
  };

  const filterByCategory = (e) => {
    const category = e.target.value;
    if (category) {
      // const buyerfilterData = fixedData.filter((items) => {
      //   return items.buyerProductId.category == category;
      // });
      // const sellerfilterData = fixedData.filter((items) => {
      //   return items.sellerProductId.category == category;
      // });
      // const filterData = buyerfilterData.concat(sellerfilterData);
      const filterData = fixedData.filter((items) => {
        return items?.category == category;
      });
      setMyItems(filterData);
    } else {
      setMyItems(fixedData);
    }
  };
  return (
    <>
      <UserMainNav />
      <DeleteModal
        show={show}
        setShow={setShow}
        updateCount={updateCount}
        id={deletingItemId}
      />
      <div className="user-viewItems-body">
        <h1 className="user-viewItems-heading text-center">My items</h1>

        <div
          className="d-flex justify-content-between align-items-center"
          style={{ paddingLeft: "8%", paddingRight: "9%" }}
        >
          <InputGroup className="mod-product-request-box1 ms-2 ps-3 ">
            <Form.Control
              className="mod-product-request-inp  "
              type="text"
              name="search"
              aria-label="search"
              placeholder="Search product"
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

          <Form.Select
            aria-label="Default select example "
            className=" admin-transaction-select"
            onChange={filterByCategory}
            style={{ height: "40px" }}
          >
            <option value="">Filter</option>
            <option value="Books">Books</option>
            <option value="Electronics">Electronics</option>
            <option value="Jewellery">Jewellery</option>
            <option value="Home-Appliances">Home-Appliances</option>
            <option value="Clothing">Clothing</option>
            <option value="Furniture">Furniture</option>
          </Form.Select>
        </div>

        {myItems.map((e) => {
          const filename = e.itemPhoto?.filename || "";
          let pic =
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXxZR0_1ISIJx_T4oB5-5OJVSNgSMFLe8eCw&s";
          if (filename) {
            pic = `${BASE_URL}${filename}`;
          }
          return (
            <div
              key={e._id}
              style={{ cursor: "pointer" }}
              onClick={() => {
                viewProductDetails(e._id);
              }}
            >
              <div className="user_viewItems-box">
                <div className="container text-center">
                  <div className="row">
                    <div className="col-4 user-viewItems-left-box">
                      <img style={{ width: "50%" }} src={pic} alt="Item" />
                    </div>
                    <div className="col-6 user-viewItems-middle-box">
                      <table>
                        <thead>
                          <tr>
                            <td>Items name</td>
                            <td>:</td>
                            <td className="user-view_Items-data">{e.name}</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Category</td>
                            <td>:</td>
                            <td className="user-view_Items-data">
                              {e.category}
                            </td>
                          </tr>
                          <tr>
                            <td>Item condition</td>
                            <td>:</td>
                            <td className="user-view_Items-data">
                              {e.condition}
                            </td>
                          </tr>
                          <tr>
                            <td>Item quantity</td>
                            <td>:</td>
                            <td className="user-view_Items-data">
                              {e.quantity}
                            </td>
                          </tr>
                          <tr>
                            <td> Location</td>
                            <td>:</td>
                            <td className="user-view_Items-data">
                              {e.location}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="col-2 user-viewItems-right-box">
                      <div className="userView-right-inner-box">
                        <p>
                          {e.isModApproved === "approve" ? (
                            <div className="d-flex  align-items-center">
                              <span className="userItemView-pending bg-success"></span>{" "}
                              &nbsp;
                              <span className="text-success">Approved </span>
                            </div>
                          ) : e.isModApproved === "reject" ? (
                            <div className="d-flex align-items-center">
                              <span className="userItemView-pending bg-danger"></span>{" "}
                              &nbsp;
                              <span className="text-danger">Rejected </span>
                            </div>
                          ) : (
                            <div className="d-flex  align-items-center">
                              <span className="userItemView-pending bg-warning"></span>{" "}
                              &nbsp;
                              <span className="text-warning">Pending </span>
                            </div>
                          )}
                        </p>
                      </div>
                      <div
                        onClick={(event) => {
                          event.stopPropagation();
                          setDeletingId(e._id);
                          handleShow();
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <img src={img2} alt="delete" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              ;
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
};

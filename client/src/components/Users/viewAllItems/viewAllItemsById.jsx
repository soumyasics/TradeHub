import { FaChevronRight } from "react-icons/fa";
import img1 from "../../../assets/images/productCardImage.png";
import Form from "react-bootstrap/Form";
import { IoSearch } from "react-icons/io5";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import img2 from "../../../assets/images/itemDetailsPoints.png";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance";
import { BASE_URL } from "../../../apis/baseURL";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import UserMainNav from "../UserMainNav";
import Footer from "../../Footer/Footer";
import "./viewAllItems.css";
export const ViewAllItemsById = () => {
  const [fixedData, setFixedData] = useState([]);
  const [approvedItems, setApprovedItems] = useState([]);
  const [activeUserId, setActiveUserId] = useState(null);
  const {item} = useParams()
  const navigate = useNavigate();
  useEffect(() => {
    const userId = localStorage.getItem("trade-hub-userId") || null;
    if (userId) {
      setActiveUserId(userId);
      getAllApprovedItems();
    } else {
      toast.error("Please login again");
      navigate("/user/login");
    }
  }, []);

  const getAllApprovedItems = async () => {
    try {
      const res = await axiosInstance.get("viewAllApproveItems");
      if (res.status === 200) {
        const data = res.data.data;
        setApprovedItems(data);
        setFixedData(data);
      }
    } catch (error) {
      console.log("Error in getAllApprovedItems", error);
    }
  };

  const addItemToWishlist = async (itemId) => {
    if (!activeUserId || !itemId) {
      console.log("Error in addItemToWishlist", activeUserId, itemId);
      return;
    }
    try {
      const res = await axiosInstance.post(`addToWishlist`, {
        itemId,
        userId: activeUserId,
      });
      if (res.status === 201) {
        toast.success(res.data.msg);
      }
    } catch (error) {
      console.log("Error in addToWishList", error);
      const status = error?.response.status;
      if (status === 400 || status === 404 || status === 500) {
        toast.error(error.response?.data?.msg || "Network issue");
      } else {
        toast.error("Network issue.");
      }
    } finally {
      getAllApprovedItems();
    }
  };

  const removeItemFromWishlist = async (itemId) => {
    console.log("removeItemFromWishlist", itemId);
    if (!activeUserId || !itemId) {
      console.log("Error in addItemToWishlist", activeUserId, itemId);
      return;
    }
    try {
      const res = await axiosInstance.post(`removeFromWishlist`, {
        itemId,
        userId: activeUserId,
      });
      if (res.status === 200) {
        toast.success(res.data.msg);
      }
    } catch (error) {
      console.log("Error in remove item from wishlist", error);
    } finally {
      getAllApprovedItems();
    }
  };

  useEffect(() => {
    console.log(item,"bb");
    if (item) {
      const filteredItems = fixedData.filter((items) => {
        return items.name.toLowerCase().includes(item.toLowerCase());
      });
      setApprovedItems(filteredItems);
      console.log(filteredItems,"filtr");
    } else {
      setApprovedItems(fixedData);
    }
  }, [item])
  const handleSearch = (e) => {
    const value = e.target.value;
    if (value) {
      const filteredItems = fixedData.filter((items) => {
        return items.name.toLowerCase().includes(value.toLowerCase());
      });
      setApprovedItems(filteredItems);
    } else {
      setApprovedItems(fixedData);
    }
  };
  const filterByCategory = (e) => {
    const category = e.target.value;
    if(category)
    {
      const filteredItems = fixedData.filter((items) => {
        return items.category == category;
      });
      setApprovedItems(filteredItems);
    }
    else
    {
      setApprovedItems(fixedData)
    }
  };

  console.log('apro', approvedItems)
  return (
    <>
      <UserMainNav />

      <div className="justify-content-between d-flex mt-4">
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
            aria-describedby="basic-addon1"
            onChange={handleSearch}
          />
          <InputGroup.Text
            id="basic-addon1"
            className="modproduct-req-search-box"
          >
            <IoSearch className="mod-product-request-search-icon" />
          </InputGroup.Text>
        </InputGroup>
      </div>

      <div className="productCard-body">
        {/* <h5 className="user-wishlist-heading2">New Arrivals</h5> */}
        <div className="container text-center">
          <div className="row row-cols-4 gap-5 d-flex my-5">
            {approvedItems.map((e) => {
              if (e?.userId._id === activeUserId) {
                return null;
              }

              const itemFilename = e?.itemPhoto?.filename || null;
              let itemPicUrl =
                "https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg";
              if (itemFilename) {
                itemPicUrl = `${BASE_URL}${itemFilename}`;
              }
              let isAlreadyWishlisted = false;

              const wishlistArr = e?.wishlistedUsersId || [];
              if (wishlistArr.includes(activeUserId)) {
                isAlreadyWishlisted = true;
              }

              return (
                <div
                  className="card productCard-box2"
                  key={e._id}
                  style={{ width: "18rem" }}
                >
                  <img
                    src={itemPicUrl}
                    className="card-img-top w-100 h-50"
                    alt="..."
                  />

                  <div className="d-flex" style={{ height: "120px" }}>
                    {!isAlreadyWishlisted ? (
                      <div
                        className="wishlist-heart-icon"
                        onClick={() => {
                          addItemToWishlist(e._id);
                        }}
                      >
                        <CiHeart className="user-wish-list-heart" />
                      </div>
                    ) : (
                      <div
                        className="wishlist-heart-icon"
                        onClick={() => {
                          removeItemFromWishlist(e._id);
                        }}
                      >
                        <FaHeart className="user-wishlist-fill-heart" />
                      </div>
                    )}

                    <div className="card-body ">
                      <h6 className="card-text">
                        {e?.name?.substring(0, 25)}{" "}
                      </h6>
                      <span className="card-text">
                        {e?.category?.length > 30
                          ? e?.category?.substring(0, 30) + "..."
                          : e?.category}
                      </span>
                    </div>
                    <div className="productCard-points-box d-flex ">
                      <img src={img2} alt="coin" />
                      <p>{e?.point}</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button
                      className="productCard-button2"
                      onClick={() => {
                        navigate(`/user/exchange-items/${e._id}`);
                      }}
                    >
                      Exchange Now <FaChevronRight />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="user-view-more-btn">
            {/* <button>View More </button> */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

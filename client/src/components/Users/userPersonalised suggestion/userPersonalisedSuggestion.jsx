import { FaChevronRight } from "react-icons/fa";
import img2 from "../../../assets/images/itemDetailsPoints.png";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./userPersonalisedSuggestion.css";
import axiosInstance from "../../../apis/axiosInstance";
import { BASE_URL } from "../../../apis/baseURL";
import Footer from "../../Footer/Footer";
import UserMainNav from "../UserMainNav";
import { Form, InputGroup } from "react-bootstrap";
import { IoSearch } from "react-icons/io5";
export const UserPersonalisedSuggestion = () => {
  const [recommendedItems, setrecommendedItems] = useState([]);
  const [activeUserId, setActiveUserId] = useState(null);
  const [fixedData, setFixedData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const userId = localStorage.getItem("trade-hub-userId") || null;
    if (userId) {
      setActiveUserId(userId);
    } else {
      toast.error("Please login again");
      navigate("/user/login");
    }
  }, []);

  const recommendation = async () => {
    try {
      const res = await axiosInstance.get(
        `personalisedRecommendation/${activeUserId}`
      );
      if (res.status === 200) {
        setrecommendedItems(res.data.data);
        setFixedData(res.data.data);
      }
    } catch (error) {
      console.log("Error in recommendation", error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    if (value) {
      const filteredItems = fixedData.filter((items) => {
        return items.name.toLowerCase().includes(value.toLowerCase());
      });
      setrecommendedItems(filteredItems);
    } else {
      setrecommendedItems(fixedData);
    }
  };
  const filterByCategory = (e) => {
    const category = e.target.value;
    if (category) {
      const filteredItems = fixedData.filter((items) => {
        return items.category == category;
      });
      setrecommendedItems(filteredItems);
    } else {
      setrecommendedItems(fixedData);
    }
  };

  useEffect(() => {
    if (activeUserId) {
      recommendation();
    }
  }, [activeUserId]);

  console.log("reoc item", recommendedItems);
  return (
    <>
      <UserMainNav />

      <div className="productCard-body">
        <div className="d-flex justify-content-center mt-5">
          <h6 className="user-wishlist-heading3">Personalised Suggestions</h6>
        </div>
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
            <option value="Home-Appliances">Home Appliances</option>
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
        <div className="container text-center">
          <div className="row row-cols-4 gap-5 d-flex my-5">
            {recommendedItems.map((e, i) => {
              if (e?.userId?._id === activeUserId) {
                return null;
              }
              console.log(i, "e score", e.score, e?.name)

              const itemFilename = e?.itemPhoto?.filename || null;
              let itemPicUrl =
                "https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg";
              if (itemFilename) {
                itemPicUrl = `${BASE_URL}${itemFilename}`;
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
                    <div className="card-body ">
                      <h6 className="card-text">{e?.name} </h6>
                      <span className="card-text">
                        {e?.description?.length > 30
                          ? e?.description?.substring(0, 30) + "..."
                          : e?.description}
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
          <div className="user-view-more-btn"></div>
        </div>
      </div>
      <Footer />
    </>
  );
};

import "./addProducts.css";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import girlImg from "../../../assets/images/girl.png";
import { ModNavbar } from "../../homeComponents/Navbar/Navbar";
import Footer from "../../Footer/Footer";
import UserNavbar from "../../homeComponents/Navbar/UserNavbar";
import MainNav from "../../homeComponents/Navbar/MainNav";
import UserMainNav from "../UserMainNav";
import axiosInstance from "../../../apis/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { BASE_URL } from "../../../apis/baseURL";

export const AddProducts = () => {
  const [validated, setValidated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [activeUserId, setActiveUserId] = useState(null);
  const [proPic, setProPic] = useState(
    "https://t4.ftcdn.net/jpg/05/42/36/11/360_F_542361185_VFRJWpR2FH5OiAEVveWO7oZnfSccZfD3.jpg"
  );
  const [productData, setProductData] = useState({
    name: "",
    userId: "",
    category: "",
    condition: "",
    address: "",
    description: "",
    quanity: "",
    pincode: "",
    location: "",
    itemPhoto: null
  });
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };
  const getUserData = (id) => {
    axiosInstance
      .post(`viewUserById/${id}`)
      .then((res) => {
        if (res.data?.status === 200) {
          setUserData(res.data.data);
          const filename = res.data.data?.profile?.filename || "";
          if (filename) {
            setProPic(`${BASE_URL}${filename}`);
          }
        } else {
          console.log("view user by id", res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const id = localStorage.getItem("trade-hub-userId") || null;
    if (id) {
      setActiveUserId(id);
      getUserData(id);
    } else {
      toast.error("Please login again.");
      navigate("/user/login");
    }
  }, []);

  console.log("user datt", userData);
  console.log("user datt", userData?.firstname);

  return (
    <>
      <UserMainNav />
      <div className="addProduct-body">
        <h2 className="addproducts-heading">ADD ITEM TO SELL</h2>
        <div className="addProducts-login-box">
          <div class="container text-center">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <div className="row">
                <div class="col-6 addproduct-left-box">
                  <Row className="mb-3">
                    <Form.Group
                      as={Row}
                      md="4"
                      controlId="validationCustom01"
                      className="d-flex"
                    >
                      <Form.Label>Catergory</Form.Label>
                      <Form.Select
                        required
                        name="category"
                        className="userproduct-select-inp"
                        onChange={handleChanges}
                      >
                        <option value="" defaultValue={""} selected>
                          Select Category
                        </option>
                        <option value="Books">Books</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Jewellery">Jewellery</option>
                        <option value="Home Appliances">Home Appliances</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Beauty">Beauty</option>
                      </Form.Select>
                      <Form.Control.Feedback
                        type="invalid"
                        className="addproducts-error-message"
                      >
                        Provide a category
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                      as={Row}
                      md="4"
                      controlId="validationCustom01"
                      className="d-flex"
                    >
                      <Form.Label>Condition</Form.Label>
                      <select
                        required
                        class="form-select userproduct-select-inp"
                        aria-label="Default select example"
                      >
                        <option value="" defaultValue={""}>
                          Select
                        </option>
                        <option value="1">Flawless</option>
                        <option value="2">No Damange</option>
                        <option value="3">Minner scratches</option>
                      </select>
                      <Form.Control.Feedback
                        type="invalid"
                        className="addproducts-error-message"
                      >
                        Provide a condition
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                      as={Row}
                      md="4"
                      controlId="validationCustom01"
                      className="d-flex"
                    >
                      <Form.Label>Quantity</Form.Label>
                      <select
                        required
                        class="form-select userproduct-select-inp"
                        aria-label="Default select example"
                      >
                        <option value="" defaultValue={""} selected>
                          Select Quantity
                        </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </select>
                    </Form.Group>

                    <Form.Group as={Row} md="4" controlId="validationCustom02">
                      <Form.Label>Upload Image</Form.Label>
                      <Form.Control
                        required
                        type="file"
                        placeholder="Upload Images"
                        className="userproduct-select-inp-img"
                      />
                      <Form.Control.Feedback
                        type="invalid"
                        className="addproducts-error-message"
                      >
                        provide a valid image
                      </Form.Control.Feedback>
                    </Form.Group>

                    <h3 className="addproducts-review-head">
                      Review your details :
                    </h3>
                    <div class="container text-center">
                      <div class="row">
                        <div class="col-5">
                          <img
                            src={proPic}
                            style={{
                              borderRadius: "50%",
                              width: "120px",
                              height: "120px",
                            }}
                            alt=""
                            className="my-5"
                          />
                        </div>
                        <div class="col-7">
                          <Form.Group
                            as={Col}
                            md="4"
                            controlId="validationCustom01"
                          >
                            <Form.Label
                              style={{
                                fontSize: "16px",
                                position: "relative",
                                left: "-65px",
                              }}
                            >
                              Name
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              value={userData?.firstname || ""}
                              placeholder="First name"
                              className="userProduct-right-last-inp"
                            />
                            <Form.Control.Feedback
                              type="invalid"
                              className="addproducts-error-message"
                            >
                              Looks good!
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group
                            as={Col}
                            md="4"
                            controlId="validationCustom01"
                          >
                            <Form.Label
                              style={{
                                fontSize: "16px",
                                position: "relative",
                                left: "-40px",
                              }}
                            >
                              PhoneNumber
                            </Form.Label>
                            <Form.Control
                              required
                              type="number"
                              name="contact"
                              placeholder="Phone Number"
                              className="userProduct-right-last-inp"
                              value={userData?.contact}
                              readonly
                            />
                            <Form.Control.Feedback
                              type="invalid"
                              className="addproducts-error-message"
                            >
                              provide phone number
                            </Form.Control.Feedback>
                          </Form.Group>
                        </div>
                      </div>
                    </div>
                  </Row>
                </div>
                <div class="col-6 addProduct-right-box">
                  <Form.Group as={Row} md="4" controlId="validationCustom02">
                    <Form.Label>Item Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Enter Item Name"
                      className="userproduct-select-inp"
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className="addproducts-error-message"
                    >
                      Please Provide a Item Name
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Row} md="4" controlId="validationCustom02 ">
                    <Form.Label>Item Description</Form.Label>
                    <Form.Group
                      className="mb-3 addproduct-textarea my-4 mx-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Item description"
                        className=""
                      />
                    </Form.Group>

                    <Form.Control.Feedback
                      type="invalid"
                      className="addproducts-error-message"
                    >
                      Please Provide a{" "}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Row} md="4" controlId="validationCustom02">
                    <Form.Label>Address</Form.Label>
                    <Form.Group
                      className="mb-3 addproduct-textarea mx-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Address"
                      />
                    </Form.Group>

                    <Form.Control.Feedback
                      type="invalid"
                      className="addproducts-error-message"
                    >
                      Looks good!
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Row} md="6" controlId="validationCustom03">
                    <Form.Label>Pincode</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Pincode"
                      required
                      className="userproduct-select-inp addproduct-right-input"
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className="addproducts-error-message"
                    >
                      Please provide a valid Pincode.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Row} md="6" controlId="validationCustom03">
                    <Form.Label> District</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Pincode"
                      required
                      className="userproduct-select-inp addproduct-right-input"
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className="addproducts-error-message"
                    >
                      Please provide a valid District.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Row} md="6" controlId="validationCustom03">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Location"
                      required
                      className="userproduct-select-inp addproduct-right-input"
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className="addproducts-error-message"
                    >
                      Please provide a valid city.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3"></Form.Group>
                  <Button type="submit" className="addpoduct-button">
                    Post Now
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

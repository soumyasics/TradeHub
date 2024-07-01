import "./addProducts.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import girlImg from "../../../assets/images/girl.png";
export const AddProducts = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
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
                    <Form.Select required className="userproduct-select-inp">
                      <option value="" defaultValue={""} selected>
                        Select
                      </option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid" className="addproducts-error-message">
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
                      <option value="" defaultValue={""} >Select</option>
                      <option value="1">Flawless</option>
                      <option value="2">No Damange</option>
                      <option value="3">Minner scratches</option>
                    </select>
                    <Form.Control.Feedback type="invalid"  className="addproducts-error-message">
                      Provide a condition
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group
                    as={Row}
                    md="4"
                    controlId="validationCustom01"
                    className="d-flex"
                  >
                    <Form.Label>Quality</Form.Label>
                    <select
                      required
                      class="form-select userproduct-select-inp"
                      aria-label="Default select example"
                    >
                      <option value="" defaultValue={""} selected>Select</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
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
                    <Form.Control.Feedback type="invalid"  className="addproducts-error-message">
                      provide a valid image
                    </Form.Control.Feedback >
                  </Form.Group>

                  <h3 className="addproducts-review-head">
                    Review your details :
                  </h3>
                  <div class="container text-center">
                    <div class="row">
                      <div class="col-5">
                        <img src={girlImg} alt="" className="my-5" />
                      </div>
                      <div class="col-7">
                        <Form.Group
                          as={Col}
                          md="4"
                          controlId="validationCustom01"
                        >
                          <Form.Label className="userProduct-right-last-label" >
                            Name
                          </Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="First name"
                            className="userProduct-right-last-inp"
                          />
                          <Form.Control.Feedback type="invalid"  className="addproducts-error-message">
                            Looks good!
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group
                          as={Col}
                          md="4"
                          controlId="validationCustom01"
                        >
                          <Form.Label className="userProduct-right-last-label-phone">
                            PhoneNumber
                          </Form.Label>
                          <Form.Control
                            required
                            type="number"
                            placeholder="Phone Number"
                            className="userProduct-right-last-inp"
                          />
                          <Form.Control.Feedback type="invalid" className="addproducts-error-message">
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
                  <Form.Control.Feedback type="invalid" className="addproducts-error-message">
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

                  <Form.Control.Feedback type="invalid" className="addproducts-error-message">
                    Please Provide a{" "}
                  </Form.Control.Feedback >
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

                  <Form.Control.Feedback type="invalid" className="addproducts-error-message">
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
                  <Form.Control.Feedback type="invalid" className="addproducts-error-message">
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
                  <Form.Control.Feedback type="invalid" className="addproducts-error-message">
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
                  <Form.Control.Feedback type="invalid" className="addproducts-error-message">
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
  );
};
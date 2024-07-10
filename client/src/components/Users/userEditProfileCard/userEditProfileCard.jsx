import { useEffect, useState } from "react";
import "./userEditProfileCard.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../apis/axiosInstance";
import toast from "react-hot-toast";

export const UsereditProfileCard = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [data, setData] = useState({});

  const handleShow = () => {
    setShow(true);
  };
  const getUserData = (id) => {
    axiosInstance
      .post(`/viewUserById/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data?.status === 200) {
          setData(res.data.data);
          console.log(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    let id = localStorage.getItem("trade-hub-userId") || null;
    if (id) {
      getUserData(id);
    } else {
      toast.error("Please login again.");
    }
  }, []);

  return (
    <div>
      <Button
        variant="primary"
        onClick={handleShow}
        className="userEditProfile-base-button"
      >
        Edit
      </Button>
      <div className="editProfile-card-body">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header className="userEditProfileCard-header">
            <Modal.Title className="EditProfileCard-heading d-flex">
              <FaArrowLeft
                className="userEditProfile-left-arrow"
                onClick={handleClose}
              />
              <p> Edit profile</p>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="editProfileCard-Label">
                  First name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your First name"
                  autoFocus
                  className="editProfileCard-input"
                  name="firstName"
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="editProfileCard-Label">
                  Last name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your First name"
                  autoFocus
                  className="editProfileCard-input"
                  name="lastName"
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label className="editProfileCard-Label">Email</Form.Label>
                <Form.Control
                  type="email"
                  className="editProfileCard-input"
                  placeholder="Enter your email"
                  name="email"
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label className="editProfileCard-Label">
                  Phone Number
                </Form.Label>
                <Form.Control
                  type="number"
                  className="editProfileCard-input"
                  placeholder="Enter your phone number"
                  name="phoneNumber"
                />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Button className="EditProfileCard-button">Update</Button>
        </Modal>
      </div>
    </div>
  );
};

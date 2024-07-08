import { useState } from "react";
import "./userEditProfileCard.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const UsereditProfileCard = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => 
  {
    setShow(true);
   
  }
  
  return (
    <div>
      <Button variant="primary" onClick={handleShow} className="userEditProfile-base-button" >
        Edit
      </Button>
      <div className="editProfile-card-body">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header className="userEditProfileCard-header">
            <Modal.Title className="EditProfileCard-heading d-flex">
              <FaArrowLeft className="userEditProfile-left-arrow" onClick={handleClose} />
              <p> Edit profile</p>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="editProfileCard-Label">Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  autoFocus
                  className="editProfileCard-input"
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
                  placeholder="Enter your name"
                  autoFocus
                  className="editProfileCard-input"
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label className="editProfileCard-Label">Email</Form.Label>
                <Form.Control type="email" className="editProfileCard-input" />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label className="editProfileCard-Label">
                  Phone Number
                </Form.Label>
                <Form.Control type="number" className="editProfileCard-input" />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Button onClick={handleClose} className="EditProfileCard-button">
            Update
          </Button>
        </Modal>
      </div>
    </div>
  );
};

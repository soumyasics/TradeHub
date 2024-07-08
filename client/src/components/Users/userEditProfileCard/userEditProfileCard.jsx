import { useState } from "react";
import "./userEditProfileCard.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
export const UsereditProfileCard = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>
      <div className="editProfile-card-body"> 
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton className="userEditProfileCard-header">
            <Modal.Title className="EditProfileCard-heading">
              Edit profile
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

                <Form.Group
                  className="mb-3 d-flex editProfileCard-radio"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Gender</Form.Label>
                  <Form.Check
                    type="radio"
                    aria-label="radio 1"
                    className="editProfile-radio-button"
                  />

                  <Form.Label>Male</Form.Label>
                  <Form.Check
                    type="radio"
                    aria-label="radio 1"
                    className="editProfile-radio-button"
                  />

                  <Form.Label>Female</Form.Label>
                </Form.Group>
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

          <Button onClick={handleClose} className="EditProfileCatd-button">
            Update
          </Button>
        </Modal>
      </div>
    </div>
  );
};

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

import "./userConfirmExchange.css";
import { ModalHeader } from "react-bootstrap";
export const UserConfirmExchange = () => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <Button variant="primary" onClick={() => setShow(true)}>
        Custom Width Modal
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        className="userConfirmExchange-body"
      >
        <Modal.Header closeButton></Modal.Header>

        <Modal.Body className="userConfirmExchange-main-body">

        <div className="user">

        </div>

        </Modal.Body>
      </Modal>
    </div>
  );
};

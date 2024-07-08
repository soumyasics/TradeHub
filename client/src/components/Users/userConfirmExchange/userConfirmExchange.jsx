import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import img1 from "../../../assets/images/userConfirmExchange.png";
import { useState } from "react";

import "./userConfirmExchange.css";
import { ModalHeader } from "react-bootstrap";
import { BiCategory } from "react-icons/bi";
export const UserConfirmExchange = () => {
  const [show, setShow] = useState(false);
  let product =[
    {itemName:"it end with us",Category:"Books"},
    {itemName:"it end with us",Category:"Books"},
    {itemName:"it end with us",Category:"Books"},
    {itemName:"it end with us",Category:"Books"},
    {itemName:"it end with us",Category:"Books"},
    {itemName:"it end with us",Category:"Books"},
    {itemName:"it end with us",Category:"Books"},
    {itemName:"it end with us",Category:"Books"}, 
   
  ]

  return (
    <div>
      <Button variant="primary" onClick={() => setShow(true)}>
       Exchange Now
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-lg"
        aria-labelledby="example-custom-modal-styling-title"
        className="userConfirmExchange-body"
      >
        <Modal.Header className="border-0" closeButton></Modal.Header>

        <Modal.Body className="userConfirmExchange-main-body ">
          <div className="d-flex flex-wrap gap-5">
            {
          product.map((e)=>
          {           
        return(
            
            <div className="userConfirmExchange-product-view">
            <img src={img1} alt="" className="userConfirmExchange-image" />
            <table className="userConfirmExchange-table">
              <tr>
                <th>Item name</th>
                <td>:</td>
                <td>{e.itemName}</td>
              </tr>
              <tr>
                <th>category</th>
                <th>:</th>
                <td>{e.Category}</td>
              </tr>
            </table>
          </div>
        )
          })
        }
          </div>
          <Button className="userConfirmExchange-button">
            Confirm Exchange
          </Button>{" "}
        </Modal.Body>
      </Modal>
    </div>
  );
};

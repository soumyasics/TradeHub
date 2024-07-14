import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axiosInstance from "../../../apis/axiosInstance";
import { BASE_URL } from "../../../apis/baseURL";

export const MyProductModals = ({ show, setShow }) => {
  const [myItems, setMyItems] = useState([]);
  const [selectItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let id = localStorage.getItem("trade-hub-userId") || null;
    console.log("iddd", id);
    if (id) {
      getItems(id);
    } else {
      toast.error("Please login again.");
      navigate("/user/login");
    }
  }, []);

  const getItems = (id) => {
    axiosInstance
      .get(`viewAllitemsByUserId/${id}`)
      .then((res) => {
        if (res.status === 200) {
          console.log("respo", res);
          let data = res?.data?.data || [];
          data.reverse();
          setMyItems(data);
        } else {
          console.log("view user by id", res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const myItemIdForExchange = (id) => {
    console.log("selected item", id);
    setSelectedItem(id);
  };
  return (
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
                onClick={() => {
                  myItemIdForExchange(e._id);
                }}
                className={`userConfirmExchange-product-view ${
                  selectItem === e._id ? "selected" : ""
                }`}
              >
                <img src={pic} alt="" className="userConfirmExchange-image" />
                <table className="userConfirmExchange-table">
                  <tr>
                    <th>Item name</th>
                    <td>:</td>
                    <td>{e.name}</td>
                  </tr>
                  <tr>
                    <th>Category</th>
                    <th>:</th>
                    <td>{e.category}</td>
                  </tr>
                </table>
              </div>
            );
          })}
        </div>
        <Button className="userConfirmExchange-button">Confirm Exchange</Button>{" "}
      </Modal.Body>
    </Modal>
  );
};

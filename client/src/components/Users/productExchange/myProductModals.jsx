import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axiosInstance from "../../../apis/axiosInstance";
import { BASE_URL } from "../../../apis/baseURL";

export const MyProductModals = ({ show, setShow, handleConfirmExchange }) => {
  const [myItems, setMyItems] = useState([]);
  const [selectItem, setSelectedItem] = useState(null);
  const [itemsCount, setItemsCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let id = localStorage.getItem("trade-hub-userId") || null;
    if (id) {
      getItems(id);
    } else {
      toast.error("Please login again.");
      navigate("/user/login");
    }
  }, []);

  const getItems = (id) => {
    axiosInstance
      .get(`viewAllActiveitemsByUserId/${id}`)
      .then((res) => {
        if (res.status === 200) {
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
    setSelectedItem(id);
  };
  const handleConfirmExchangeFromModal = () => {
    if (!selectItem) {
      toast.error("Please choose your item for exchange");
      return;
    }
    handleConfirmExchange(selectItem);
  };
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      dialogClassName="modal-lg"
      aria-labelledby="example-custom-modal-styling-title"
      className="userConfirmExchange-body"
    >
      <Modal.Header className="border-0 d-flex justify-content-center">
        <div className="w-100 d-flex justify-content-between align-items-center">
          <h6>Choose your product for exchange</h6>
          <h6>Wallet Balance: 100</h6>
        </div>
      </Modal.Header>

      <Modal.Body className="userConfirmExchange-main-body ">
        <div
          className="d-flex flex-wrap gap-5 "
          style={{ height: "350px", overflowY: "auto" }}
        >
          {myItems.length === 0 && (
            <div className="h-100 w-100 align-items-center d-flex justify-content-center">
              <h5>You don't have any items for exchange.</h5>
            </div>
          )}
          {myItems.map((e) => {
            if (e.isModApproved === "pending") {
              return;
            }
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
                <div className="d-flex justify-content-center">
                  <img src={pic} alt="" className="userConfirmExchange-image" />
                </div>
                <table className="userConfirmExchange-table">
                  <tr>
                    <th>Item Name</th>
                    <td>:</td>
                    <td>{e?.name}</td>
                  </tr>
                  {/* <tr>
                    <th>Category</th>
                    <th>:</th>
                    <td>{e?.category}</td>
                  </tr> */}
                  <tr>
                    <th>Item Point</th>
                    <th>:</th>
                    <td>{e?.point}</td>
                  </tr>
                </table>
              </div>
            );
          })}
        </div>
        <Button
          className="userConfirmExchange-button"
          onClick={handleConfirmExchangeFromModal}
        >
          Sent Exchange Request
        </Button>{" "}
      </Modal.Body>
    </Modal>
  );
};

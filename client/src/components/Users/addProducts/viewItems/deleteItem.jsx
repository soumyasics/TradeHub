import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axiosInstance from "../../../../apis/axiosInstance";
import { toast } from "react-hot-toast";

export const DeleteModal = ({ show, setShow, updateCount, id }) => {
  const handleClose = () => setShow(false);
  const deleteItem = async () => {
    try {
      if (!id) {
        return;
      }
      const res = await axiosInstance.patch(`deleteItemById/${id}`);
      console.log("r/user/view-itemsespo", res)
      if (res.status === 200) {
        toast.success("Item Deleted Successfully");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      const status = error?.response?.status;
      if (status === 400) {
        toast.error(error?.response?.data?.message || "Something went wrong");
        return;
      }
      console.log("Error on deleting item", error);
    } finally {
        updateCount()
        handleClose();
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteItem}>
            Delete item
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

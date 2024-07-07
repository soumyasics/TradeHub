import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Table } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../apis/axiosInstance";
export const AssignPointsModal = ({ show, itemId, handleClose, ph }) => {
  const [point, setPoint] = useState("");
  const [listing, setListing] = useState("");
  const [modId, setModId] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const modId = localStorage.getItem("trade-hub-modId") || null;
    if (!modId) {
      navigate("moderator/login");
      return;
    }

    setModId(modId);
  }, []);

  console.log("mod id", modId);

  const handleSubmit = () => {
    console.log(point, listing);
    if (!point) {
      toast.error("Please enter point");
      return;
    }

    if (point > 10000) {
      toast.error("Point should be less than 10000");
      return;
    }
    if (point < 1) {
      toast.error("Point should be greater than 0");
      return;
    }
    if (!listing) {
      toast.error("Please enter listing");
      return;
    }

    const data = {
      modId,
      itemId,
      point,
      listing,
    };
    sendDataToServer(data)
  };
  const sendDataToServer = async (data) => {
    try {
      const res = await axiosInstance.post("/addPointToItem", data);
      if (res.status === 200) {
        toast.success(res.data.msg);
      }
    } catch (error) {
      const status = error?.response.status || null;
      if (status === 400 || status === 404 || status === 500) {
        toast.error(error?.response?.data?.msg);
      } else {
        toast.error("Network issue. Please try again");
      }
    }finally {
      handleClose()

    }
  }
  return (
    <div>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header className="text-center mx-auto">
          <Modal.Title
            className="text-center mx-auto"
            style={{ color: "#6D3698" }}
          >
            {" "}
            Assign Points
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table>
            <tbody>
              <tr>
                <td>
                  <Form.Label>Points</Form.Label>
                </td>
                <td>:</td>
                <td>
                  <Form.Control
                    type="number"
                    max="10000"
                    min="1"
                    placeholder="Point"
                    autoFocus
                    onChange={(e) => setPoint(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  {" "}
                  <Form.Label>Listing</Form.Label>
                </td>
                <td>:</td>
                <td>
                  <Form.Control
                    onChange={(e) => setListing(e.target.value)}
                    as="textarea"
                    rows={3}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  {" "}
                  <Form.Label>Call</Form.Label>
                </td>
                <td>:</td>
                <td>
                  <p>{ph || " "}</p>
                </td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center ">
          <Button
            variant="primary"
            style={{ backgroundColor: "#6D3698" }}
            onClick={handleSubmit}
          >
            Assign Points
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

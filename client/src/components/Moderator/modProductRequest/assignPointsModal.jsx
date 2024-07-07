import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Table } from "react-bootstrap";
import { toast } from "react-hot-toast";
export const AssignPointsModal = ({ show, handleClose, ph }) => {
  const [point, setPoint] = useState("");
  const [listing, setListing] = useState("");

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
  };
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

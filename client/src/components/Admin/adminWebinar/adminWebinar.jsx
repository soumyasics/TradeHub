import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import "./adminWebinar.css";
import axiosInstance from "../../../apis/axiosInstance";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
export const AdminWebinar = () => {
  const [data, setData] = useState(
    {
      topic:"",
      speakers:"",
      date:"",
      time:"",
      duration:"",
      description:"",
      webinarLink:"",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const sendDataToServer = async () => {
    try {
      const response = await axiosInstance.post("/createWebinar", data);
      if (response.status == 200) {
        toast.success("Updated successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkValidity = () => {
    const { topic,
        speakers,
        date,
        time,
        duration,
        description,
        webinarLink, } = data;

    if (!topic) {
      toast.error("Topic is required");
      return false;
    }
    if (!speakers) {
      toast.error("Speakers is required");
      return false;
    }
    if (!date) {
      toast.error("Date is required");
      return false;
    }
    if (!time) {
      toast.error("Time is required");
      return false;
    }
    if (!duration) {
      toast.error("Duration required");
      return false;
    }
    if (!webinarLink) {
      toast.error("Link required");
      return false;
    }
   
    if (!description) {
      toast.error("Description is required");
      return false;
    }
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!checkValidity()) {
      return;
    }
    sendDataToServer();
  };
  return (
    <div className="adminWebinar-body">
      <h2>ADD WEBINAR</h2>
      <div className="adminWebinar-main-box">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Topic</Form.Label>
              <Form.Control
                type="text"
                name="topic"
                placeholder="Topic"
                onChange={handleChange}
              />
            </Form.Group>

            
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Speakers</Form.Label>
              <Form.Control
                type="text"
                placeholder="Speakers"
                name="speakers"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" name="date" onChange={handleChange} />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Time</Form.Label>
              <Form.Control type="time" name="time" onChange={handleChange} />
            </Form.Group>

           
           
         </Row>
         
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="text"
                name="duration"
                placeholder="Duration"
                onChange={handleChange}
              />
            </Form.Group> 
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Link</Form.Label>
              <Form.Control
                type="text"
                name="webinarLink"
                placeholder="Link"
                onChange={handleChange}
              />
            </Form.Group> 


          </Row>
          <Form.Label>Description</Form.Label>
          <FloatingLabel
            controlId="floatingTextarea"
            label="Comments"
            className="mb-3"
          >
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              name="description"
              onChange={handleChange}
            />
          </FloatingLabel>
          <Button type="submit" variant="primary">
            Add Webinar
          </Button>{" "}
        </Form>
      </div>
    </div>
  );
};

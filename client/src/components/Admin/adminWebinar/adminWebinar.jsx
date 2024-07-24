import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from 'react-bootstrap/Button';
import "./adminWebinar.css";
export const AdminWebinar = () => {
  return (
    <div className="adminWebinar-body">
        <h2>ADD WEBINAR</h2>
      <div className="adminWebinar-main-box">
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Title" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Deadline</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>category</Form.Label>
              <Form.Control type="text" placeholder="Category" />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Salary</Form.Label>
              <Form.Control type="text" placeholder="Salary" />
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Consulting Phone Number</Form.Label>
            <Form.Control type="number" placeholder="Consulting Phone Number" />
          </Form.Group>
          <Form.Label>Description</Form.Label>

          <FloatingLabel
            controlId="floatingTextarea"
            label="Comments"
            className="mb-3"
          >

            <Form.Control as="textarea" placeholder="Leave a comment here" />
          </FloatingLabel>
        </Form>

        <Button variant="primary">Add Webinar</Button>{' '}

      </div>
    </div>
  );
};

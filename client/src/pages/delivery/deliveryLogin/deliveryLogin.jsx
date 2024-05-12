import { useState } from "react";
import { Container, Image, Row, Col, Form, Button } from "react-bootstrap";
import rocketImg from "../../../assets/images/rocket-img.png";
import loginImg from "../../../assets/images/signup-img.jpg";
import manTypingImg from "../../../assets/images/man-typing-img.png";
import deliveryIllusImg from "../../../assets/images/del-illus.jpg";
import "./deliveryLogin.css";

const DeliveryLogin = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <Container id="mod-signup-container" fluid className="w-100">
      <Container
        id="mod-form"
        fluid
        className="border ps-0 h-75 w-75 rounded d-flex"
      >
        <Container fluid className="p-0 w-50 h-100 border pt-5 center" id="del-login-img-container">
          {/* <Image className="w-100" src={loginImg} alt="barter" /> */}
          <Image
            className="w-75"
            src={deliveryIllusImg}
            alt="barter"
          />
        </Container>
        <Form
          noValidatep
          validated={validated}
          onSubmit={handleSubmit}
          className="w-50 h-100 border p-3"
        >
          <h2 className="text-center text-dark">Delivery Agent Login</h2>

          <Form.Group className="mt-5 text-dark">
            <Row>
              <Col xs={3}>
                <Form.Label>Email</Form.Label>
              </Col>
              <Col>
                <Form.Control type="email" placeholder="Email" required />
                <Form.Control.Feedback type="invalid">
                  Please provide email.
                </Form.Control.Feedback>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className="mt-3 text-dark">
            <Row>
              <Col xs={3}>
                <Form.Label>Password</Form.Label>
              </Col>
              <Col>
                <Form.Control type="password" placeholder="Password" required />
                <Form.Control.Feedback type="invalid">
                  Please provide password.
                </Form.Control.Feedback>
              </Col>
            </Row>
          </Form.Group>
          <Row>
            <Col xs={6}></Col>
            <Col>
              <p className="text-end text-dark">
                <i>Forgot password?</i>
              </p>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col className="center">
              <p className="text-dark">
                {" "}
                Don't have an account ?{" "}
                <span className="text-decoration-underline text-primary">
                  {" "}
                  Create an account
                </span>
              </p>
            </Col>
          </Row>
          <Button className="mt-3 mx-auto center" type="submit">
            Login
          </Button>
        </Form>
      </Container>
    </Container>
  );
};
export default DeliveryLogin;

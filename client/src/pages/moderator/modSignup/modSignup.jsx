import { useState } from "react";
import { Col, Container, Row, Image } from "react-bootstrap";
import cactusImg from "../../../assets/images/cactus.png";
import typingGirlImg from "../../../assets/images/typing-girl-img.png";
import manThinkingImg from "../../../assets/images/typing-girl-img.png";
import ModSignupForm from "./modSignupForm";
import "./modSignup.css";

const ModSignup = () => {
  const [signupBtnClicked, setSignupBtnClicked] = useState(false);
  function clickSignupBtn() {
    setSignupBtnClicked(true);
  }

  return (
    <Container fluid className="user-signup-container center">
      <Row
        fluid="md"
        className="position-relative user-signup-form-box mx-auto"
      >
        <Col xs={9} className="pt-3 ps-4">
          <h3 className="welcome-text poppins-semibold">
            {" "}
            REGISTER AS A <span> MODERATOR</span>{" "}
          </h3>

          <p
            className={`${signupBtnClicked && "signup-caption"} my-2`}
            style={{ fontSize: "14px", color: "gray" }}
          >
            <i>
              Welcome to our Trade Hub,Join the exchange revolution and
              rediscover the art of trading
            </i>
          </p>

          <Container style={{ height: "88%" }} fluid className="p-0">
            <ModSignupForm signupBtnClicked={signupBtnClicked} clickSignupBtn={clickSignupBtn} />
          </Container>
        </Col>

        <Col
          xs={3}
          className="user-signup-right-side rounded position-absolute d-flex"
        >
          <div className="d-flex signup-img-container">
            <Image
              className="typing-girl-img"
              src={manThinkingImg}
              alt="cactus"
            />
            <Image className="cactus-img" src={cactusImg} alt="cactus" />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ModSignup;

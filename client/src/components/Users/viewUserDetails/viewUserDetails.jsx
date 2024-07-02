import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Image,
  Row,
  Table,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { IllustrationSection } from "../../common/illustration/illustration";
import axiosInstance from "../../../apis/axiosInstance";
import { useNavigate } from "react-router-dom";
import { ModNavbar } from "../../homeComponents/Navbar/Navbar";
import Footer from "../../Footer/Footer";
import { BASE_URL } from "../../../apis/baseURL";
export const ViewUserDetails = () => {
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    contact: "",
    profile: "",
    email: "",
    gender: "",
  });
  const [pic, setPic] = useState(
    "https://st4.depositphotos.com/4329009/19956/v/450/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg"
  );
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchUserData(id);
    } else {
      navigate("/moderator/view-users");
    }
  }, []);

  const fetchUserData = async (id) => {
    try {
      const res = await axiosInstance.post("viewUserById/" + id);
      let userData = res?.data?.data || null;
      if (userData) {
        setData(userData);
      }
    } catch (error) {
      console.log("fetch user data =>", error);
    }
  };

  useEffect(() => {
    if (data.profile) {
      const filename = data.profile?.filename || "";
      if (filename) {
        setPic(`${BASE_URL}${filename}`);
      }
    }
  }, [data]);

  console.log("user data", data);
  console.log("user data name", data.firstname);
  return (
    <>
      {" "}
      <ModNavbar />
      <Container className="mt-5">
        <h3 className="text-center text-primary shadow">User details</h3>
        <Row>
          <Col md={4}>
            <IllustrationSection
              imgPath="https://img.freepik.com/free-vector/profile-interface-concept-illustration_114360-2850.jpg"
              alt="Connect-network"
            />
          </Col>
          <Col md={8}>
            <Card>
              <Card.Body>
                <div className="d-flex justify-content-center align-items-center">
                  <Image
                    style={{ width: "100px", height: "100px" }}
                    rounded
                    src={pic}
                  />
                </div>
                <div className="shadow p-2" style={{ minHeight: "300px" }}>
                  <Card.Title className="mt-3 text-center">
                    FullName: {data?.firstname + " " + data?.lastname}
                  </Card.Title>
                  <Card.Text className="mt-5">
                    <Row>
                      <Col>
                        <p>
                          {" "}
                          <strong>Email:</strong> {data?.email} <br />
                        </p>
                        <p>
                          <strong>Phone Number:</strong> {data?.contact} <br />
                        </p>
                        <p>
                          <strong>Gender:</strong> {data?.gender} <br />
                        </p>
                      </Col>
                    </Row>
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <div>
        <Footer />
      </div>
    </>
  );
};

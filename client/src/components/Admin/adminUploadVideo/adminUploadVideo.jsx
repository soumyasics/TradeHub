import Form from "react-bootstrap/Form";
import img1 from "../../../assets/images/totoriaImage.jpeg";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import toast from "react-hot-toast";
import { axiosMultipartInstance } from "../../../apis/axiosMultipartInstance";
export const AdminUploadVideo = () => {
  const [validated, setValidated] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    thumbnail: "",
    video: "",
  });
  const handleChanges = (e) => {
    const { name, value, files, type } = e.target;
    if (type == "file") {
      const file = files[0] || files[1];
      setData({ ...data, [name]: file, });
    } else {
      setData({ ...data, [name]: value, });
    }
    console.log(data);
  };

  const sentDataToServer = async () => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("file", data.thumbnail);
    formData.append("file", data.video);
    try {
      const response = await axiosMultipartInstance.post(
        "/createVideoTutorial",
        data
      );
      if (response.status == 200) {
        toast.success("Uploaded sucessfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    sentDataToServer();
  };
  return (
    <div style={{ marginTop: "80px" }}>
      <h2 className="text-center mt-3   mb-3 fw-bold">Upload Tutorial</h2>
      <div className="row mt-5">
        <div className="col-3">
          <img
            src={img1}
            alt=""
            style={{
              width: "90%",
              height: "81%",
              marginLeft: "50%",
              marginTop: "10%",
            }}
          />
        </div>
        <div className="col-9">
          <Form
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
            }}
            className="w-50 p-4 mx-auto "
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label> Tutorial title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  onChange={handleChanges}
                  placeholder="Tutorial title"
                  required
                />
                <Form.Control.Feedback type="invalid" className="">
                  Please provide a valid title.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6">
                <Form.Label>Tutorial Description</Form.Label>
                <Form.Control
                  as="input"
                  name="description"
                  onChange={handleChanges}
                  type="text"
                  placeholder="Tutorial Description"
                  required
                  min="0"
                  max="100000000"
                />
                <Form.Control.Feedback type="invalid" className="">
                  Please provide description.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3 mt-3">
              <Form.Group as={Col} md="6">
                <Form.Label>Tutorail Thumbnail</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Tutorail Thumbnail"
                  name="Thumbnail"
                  onChange={handleChanges}
                  required
                />

                <Form.Control.Feedback type="invalid" className="">
                  Please provide thumbnail.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label>Tutorail Video</Form.Label>
                <Form.Control
                  as="input"
                  name="video"
                  onChange={handleChanges}
                  type="file"
                  placeholder="Tutorail Video"
                  required
                  min="0"
                  max="100000000"
                />
                <Form.Control.Feedback type="invalid" className="">
                  Please provide thumbnail.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <div className="d-flex justify-content-center">
              <Button className="mx-auto w-25" type="submit">
                Upload
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

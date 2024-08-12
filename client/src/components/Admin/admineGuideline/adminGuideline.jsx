import { useState } from "react";
import "./adminGuideline.css";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";
import axiosInstance from "../../../apis/axiosInstance";
import { useNavigate } from "react-router-dom";

export const AdminGuideline = ({ redirectToGuideline }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: "",
    content: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  console.log(data);
  const checkValidite = () => {
    const { title, content } = data;
    if (!title) {
      toast.error("title is required");
      return false;
    }
    if (!content) {
      toast.error("content is required");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checkValidite()) {
      return;
    }
    sendData();
  };

  const sendData = async () => {
    try {
      const res = await axiosInstance.post("/createGuideline", data);
      if (res.status === 200) {
        toast.success(res.data.msg);
        redirectToGuideline();
      } else {
        toast.error(res.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="adminGuieline-body">
        <h1>Guidelines</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3 d-flex">
            <Form.Label className="adminGuideline-title ">Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              className="adminGuideline-input"
              onChange={handleChange}
              name="title"
              value={data.title}
            />
          </Form.Group>
          <Form.Group
            className=" mb-3 d-flex "
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label className="adminGuideline-label1">Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={15}
              className="adminGuideline-textArea1"
              placeholder="content"
              onChange={handleChange}
              name="content"
              value={data.content}
            />
          </Form.Group>
          <div className="d-flex justify-content-center ">
            <button className="adminGuideline-submit my-3" type="submit">
              Submit
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

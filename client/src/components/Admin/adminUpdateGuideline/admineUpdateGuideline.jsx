import { useNavigate } from "react-router-dom";
import "./adminUpdateGuideline.css";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance";

export const AdminUpdateGuideline = () => {
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const [inpdata, setInpData] = useState("");
  useEffect(() => {
    axiosInstance("/viewGuideline")
      .then((res) => {
       if(res.data.status==200)
        {
          console.log(res);
          setData(res.data.data);
        }
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    setInpData(e.target.value);
    axiosInstance
      .patch("editGuidelines", inpdata)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="adminGuieline-body">
        <h1>Guidelines</h1>
        <Form>
          <Form.Group
            className="mb-3 d-flex"
            controlId="exampleForm.ControlInput1"
          >
            <Form.Label className="adminGuideline-title ">Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              className="adminGuideline-input"
              name="title"
              onChange={handleChange}
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
              name="content"
              onChange={handleChange}
              value={data.content}
            />
          </Form.Group>
          <button type="submit" className="adminGuideline-update">
            update
          </button>
          <button
            className="adminGuideline-cancel"
            onClick={() => {
              navigate("/admine/view/guideline");
            }}
          >
            cancel
          </button>
        </Form>
      </div>
    </div>
  );
};

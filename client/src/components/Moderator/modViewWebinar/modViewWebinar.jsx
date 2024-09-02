import Table from "react-bootstrap/Table";
import "./modviewWebinar.css";
import axiosInstance from "../../../apis/axiosInstance";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-hot-toast";
function ModViewWebinar({ user }) {
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await axiosInstance.get("/allWebinars");
      if (response.status === 200) {
        let webinars = response.data.webinars;
        webinars = webinars.reverse();
        setData(webinars);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteWebinar = async (id) => {
    if (!id) {
      return;
    }
    try {
      const res = await axiosInstance.delete(`/deleteWebinar/${id}`);
      if (res.status === 200) {
        toast.success("Webinar deleted successfully");
        getData();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h2 className="modViewWebinar-heading">Webinar</h2>
      <Table
        striped
        bordered
        hover
        style={{ width: "90%" }}
        className="mx-auto"
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Topic</th>
            <th>Speakers</th>
            <th>Date</th>
            <th>Time</th>
            <th>Duration</th>
            <th>Description</th>
            <th>Webinar Link</th>
            {user === "admin" && <th>Delete</th>}
          </tr>
        </thead>
        <tbody >
          {data.map((e, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{e.topic}</td>
                <td>{e.speakers}</td>
                <td>{e.date}</td>
                <td>{e.time}</td>
                <td>{e.duration}</td>
                <td>{e.description?.substring(0, 200)}</td>
                <td>{e.webinarLink}</td>
                {user === "admin" && (
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => {
                        deleteWebinar(e._id);
                      }}
                    >
                      {" "}
                      Delete{" "}
                    </Button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default ModViewWebinar;

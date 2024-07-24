import Table from "react-bootstrap/Table";
import "./modviewWebinar.css";
import axiosInstance from "../../../apis/axiosInstance";
import { useEffect, useState } from "react";
function ModViewWebinar() {
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await axiosInstance.get("/allWebinars");
      if (response.status) {
        setData(response.data.webinars
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(data);


  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
        <h2 className="modViewWebinar-heading">WEBINAR</h2>
      <Table striped bordered hover size="sm" className="modViewWWebinar">
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
          </tr>
        </thead>
        {data.map((e, index) =>
         {          
         return(
            <tbody key={index}>
            <tr>
              <td>{index+1}</td>
              <td>{e.topic}</td>
              <td>{e.speakers}</td>
              <td>{e.date}</td>
              <td>{e.time}</td>
              <td>{e.duration}</td>
              <td>{e.description}</td>
              <td>{e.webinarLink}</td>
            </tr>
          </tbody>
         )
        })}
      </Table>
    </div>
  );
}

export default ModViewWebinar;

import React, { useEffect, useState } from "react";
import "./modViewUsers.css";
import axiosInstance from "../../../apis/axiosInstance";
import { Button, Table } from "react-bootstrap";
import { ModNavbar } from "../../homeComponents/Navbar/Navbar";
import Footer from "../../Footer/Footer";

export const ModViewUsers = () => {
  const [data, setData] = useState([]);
    let tableRowCount = 0;
  const handleActive = (id) => {
    console.log(id);
    axiosInstance
      .post(`/activateUserById/${id}`)
      .then((res) => {
        console.log("respo, handle acti", res);
        if (res.data.status === 200) {
          const updatedData = data.map((users) => {
            if (users._id === id) {
              users.isActive = true;
            }
            return users;
          });
          setData(updatedData);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const handleDeactive = (id) => {
    axiosInstance
      .post(`/deActivateUserById/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          const updatedData = data.map((users) => {
            if (users._id === id) {
              users.isActive = false;
            }
            return users;
          });
          setData(updatedData);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const toggleUserActiveState = (users) => {
    console.log("toggle", users);
    if (users.isActive) {
      handleDeactive(users._id);
    } else {
      handleActive(users._id);
    }
  };

  useEffect(() => {
    axiosInstance
      .post("/viewUsers")
      .then((res) => {
        if (res.data.status === 200) {
          console.log(res);
          setData(res.data.data || []);
        } else {
          setData([]);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);

  return (
    <>
      <ModNavbar />
      <div style={{minHeight: "70vh"}}>
        <h3 className="mt-5 text-center"> View active users </h3>
        {data.length !== 0 ? (
          <div className="table-container">
            <Table striped hover className="table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Email</th>
                  <th>Phone number</th>
                  <th>View Details</th>
                  {/* <th>Active/Inactive</th> */}
                </tr>
              </thead>
              <tbody>
                {data.map((user, index) => {
                  if (user && !user.isActive) {
                    return null;
                  }
                  tableRowCount++;
                  return (
                    <tr key={user._id}>
                      <td>{tableRowCount}</td>
                      <td>
                        {user.firstname} {user.lastname}
                      </td>
                      <td>{user.gender}</td>
                      <td>{user.email}</td>
                      <td>{user.contact}</td>
                      <td>
                        <Button variant={"success"}>View Details</Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        ) : (
          <div>
            <h1>No data found</h1>
          </div>
        )}
      </div>
      <div className='mt-5'>
        <Footer />
      </div>
    </>
  );
};

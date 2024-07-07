import React, { useEffect, useState } from "react";
import "../Admin.css";
import axiosInstance from "../../../apis/axiosInstance";
import { Table } from "react-bootstrap";

export const AdminViewallMods = () => {
  const [data, setData] = useState([]);

  const handleActive = (id) => {
    console.log(id);
    axiosInstance
      .post(`/activateModeratorById/${id}`)
      .then((res) => {
        console.log("activ,", res)
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
      .post(`/deactivateModeratorById/${id}`)
      .then((res) => {
        console.log("resp deac,", res)
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
    if (users.isActive) {
      handleDeactive(users._id);
    } else {
      handleActive(users._id);
    }
  };

  const getAllMods = () => {
    axiosInstance
      .post("/viewModerators")
      .then((res) => {
        if (res.data.status === 200) {
          console.log("mods ", res);
          setData(res.data.data || []);
        } else {
          setData([]);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  useEffect(() => {
    getAllMods();
  }, []);

  return (
    <div>
  
   
      <h3 className="mt-2 text-center"> View active moderators </h3>
      {data.length !== 0 ? (
        <div  className="table-container" style={{overflowY: "scroll", height: "80vh"}}>
          <Table striped hover className="table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Email</th>
                <th>Phone number</th>
                <th>Active/Inactive</th>
              </tr>
            </thead>
            <tbody>
              {data.map((users, index) => (
                <tr key={users._id}>
                  <td>{index + 1}</td>
                  <td>
                    {users.firstname} {users.lastname}
                  </td>
                  <td>{users.gender}</td>
                  <td>{users.email}</td>
                  <td>{users.contact}</td>
                  <td>
                    <button
                      className={`toggle-button ${
                        users.isActive ? "active" : "inactive"
                      }`}
                      onClick={() => {
                        toggleUserActiveState(users);
                      }}
                    >
                      {users.isActive ? "Active" : "Inactive"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <div>
          <h1>No data found</h1>
        </div>
      )}
    </div>
  );
};

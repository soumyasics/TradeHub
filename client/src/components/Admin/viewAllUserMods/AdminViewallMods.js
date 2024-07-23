import React, { useEffect, useState } from "react";
import "../Admin.css";
import axiosInstance from "../../../apis/axiosInstance";
import { Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { IoSearch } from "react-icons/io5";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
export const AdminViewallMods = () => {
  const [data, setData] = useState([]);
  const [fixedData, setFixedData] = useState([]);

  const handleActive = (id) => {
    console.log(id);
    axiosInstance
      .post(`/activateModeratorById/${id}`)
      .then((res) => {
        console.log("activ,", res);
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
        console.log("resp deac,", res);
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
          const adminApprovedMods =
            res.data?.data.filter((mod) => mod.adminApproved === "approve") ||
            [];
          setFixedData(adminApprovedMods);
          setData(adminApprovedMods || []);
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

  const handlechange = (e) => {
    const value = e.target.value;
    console.log("value", value);

    console.log("fix", fixedData);
    if (value) {
      const filterData = fixedData.filter((items) => {
        const name  = `${items.firstname} ${items.lastname}`
        return name?.toLowerCase().includes(value.toLowerCase());
      });
      setData(filterData);
    } else {
      return setData(fixedData);
    }
  };

  return (
    <div>
      {data.length > 0 && (
        <h3 className="mt-2 text-center"> View moderators </h3>
      )}


<InputGroup className="mod-product-request-box1 ms-2 ps-3 ">
        <Form.Control
          className="mod-product-request-inp"
          type="text"
          name="search"
          aria-label="search"
          placeholder="Search moderator"
          aria-describedby="basic-addon1"
          onChange={handlechange}
        />
        <InputGroup.Text
          id="basic-addon1"
          className="modproduct-req-search-box"
        >
          <IoSearch className="mod-product-request-search-icon" />
        </InputGroup.Text>
      </InputGroup>

      {data.length !== 0 ? (
        <div
          className="table-container"
          style={{ overflowY: "scroll", height: "80vh" }}
        >
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
        <div className="text-center m-5">
          <h3>No moderatos found</h3>
        </div>
      )}
    </div>
  );
};

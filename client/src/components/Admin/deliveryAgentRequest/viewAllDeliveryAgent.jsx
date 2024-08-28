import React, { useEffect, useState } from "react";
import "../Admin.css";
import axiosInstance from "../../../apis/axiosInstance";
import { Table } from "react-bootstrap";
import { FcCheckmark } from "react-icons/fc";
import { FaXmark } from "react-icons/fa6";
import { toast } from "react-hot-toast";
import Form from "react-bootstrap/Form";
import { IoSearch } from "react-icons/io5";
import InputGroup from "react-bootstrap/InputGroup";
import { RxValue } from "react-icons/rx";
export const AdminViewAllActiveDeliveryAgent = () => {
  const [data, setData] = useState([]);
  const [fixedData, setFixedData] = useState([]);

  const handleActive = (id) => {
    axiosInstance
      .get(`/activeDeliveryAgentById/${id}`)
      .then((res) => {
        console.log("respo, handle acti", res);
        if (res.status === 200) {
          toast.success("Activate successfully");
        }
      })
      .catch((err) => {
        console.log("Error", err);
      })
      .finally(() => {
        getAllActiveRequest();
      });
  };

  const handleInActive = (id) => {
    axiosInstance
      .get(`/inActiveDeliveryAgentById/${id}`)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Deactivate successfully");
        }
      })
      .catch((err) => {
        console.log("Error", err);
      })
      .finally(() => {
        getAllActiveRequest();
      });
  };

  const getAllActiveRequest = () => {
    axiosInstance
      .get("/allAcceptDelivery")
      .then((res) => {
        if (res.status === 200) {
          let data = res?.data?.data || [];
          data.reverse();
          setData(data);
          setFixedData(data);
        } else {
          setData([]);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  useEffect(() => {
    getAllActiveRequest();
  }, []);

  const toggleUserActiveState = (users) => {
    console.log("toggle", users);
    if (users.isActive) {
      handleInActive(users._id);
    } else {
      handleActive(users._id);
    }
  };

  console.log("pending data", data);

  const handleSearch = (e) => {
    const value = e.target.value;
    if (value) {
      const filterData = fixedData.filter((items) => {
        const name = `${items.firstname} ${items.lastname}`;
        return name?.toLowerCase().includes(value.toLowerCase());
      });
      setData(filterData);
    } else {
      setData(fixedData);
    }
  };

  return (
    <div className="pt-5">
      {data.length > 0 && (
        <div className="text-center">
          <h4 className="mx-auto">View all delivery agents</h4>
        </div>
      )}

      <InputGroup className="mod-product-request-box1 ms-2 ps-3 ">
        <Form.Control
          className="mod-product-request-inp"
          type="text"
          name="search"
          aria-label="search"
          placeholder="Search delivery agent"
          aria-describedby="basic-addon1"
          onChange={handleSearch}
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
          <Table
            striped
            hover
            className="table"
            responsive
            id="adm-table-container"
          >
            <thead>
              <tr>
                <th>S.No</th>
                <th>Full Name</th>
                <th>Gender</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Active/inactive</th>
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
                  <td>{users.address}</td>
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
          <h3 className="text-center">Delivery agents not found.</h3>
        </div>
      )}
    </div>
  );
};

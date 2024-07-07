import React, { useEffect, useState } from "react";
import "../Admin.css";
import axiosInstance from "../../../apis/axiosInstance";
import { Table } from "react-bootstrap";
import { FcCheckmark } from "react-icons/fc";
import { FaXmark } from "react-icons/fa6";
import { toast } from "react-hot-toast";
export const AdminViewAllActiveDeliveryAgent = () => {
  const [data, setData] = useState([]);

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
          setData(res.data?.data || []);
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

  return (
    <div className="pt-5">
      {data.length > 0 && (
        <div className="text-center">
          <h4 className="mx-auto">View all delivery agents</h4>
        </div>
      )}

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
          <h3 className="text-center">
            Delivery agent pending request not found.
          </h3>
        </div>
      )}
    </div>
  );
};

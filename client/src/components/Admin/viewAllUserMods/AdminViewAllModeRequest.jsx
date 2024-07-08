import React, { useEffect, useState } from "react";
import "../Admin.css";
import axiosInstance from "../../../apis/axiosInstance";
import { Table } from "react-bootstrap";
import { FcCheckmark } from "react-icons/fc";
import { FaXmark } from "react-icons/fa6";
import { toast } from "react-hot-toast";
export const AdminViewAllModRequest = () => {
  const [data, setData] = useState([]);

  const hanldeApprove = (id) => {
    axiosInstance
      .get(`/approveModById/${id}`)
      .then((res) => {
        console.log("respo, handle acti", res);
        if (res.status === 200) {
          toast.success("Approved successfully");
        }
      })
      .catch((err) => {
        console.log("Error", err);
      })
      .finally(() => {
        getAllPendingRequest();
      });
  };

  const handleReject = (id) => {
    axiosInstance
      .get(`/rejectModById/${id}`)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Rejected successfully");
        }
      })
      .catch((err) => {
        console.log("Error", err);
      })
      .finally(() => {
        getAllPendingRequest();
      });
  };

  const getAllPendingRequest = () => {
    axiosInstance
      .get("/allPendingMods")
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
    getAllPendingRequest();
  }, []);

  console.log("pending data", data);

  return (
    <div className="pt-5">
      {data.length > 0 && (
        <div className="text-center">
          <h4 className="mx-auto">Moderators requests</h4>
        </div>
      )}

      {data.length !== 0 ? (
        <div
          className="table-container"
          style={{ overflowY: "scroll", height: "80vh" }}
        >
          <Table striped hover className="table" responsive id="adm-table-container">
            <thead >
              <tr>
                <th>S.No</th>
                <th>Full Name</th>
                <th>Gender</th>
                <th>Email</th>
                <th>Phone Number</th>
                {/* <th>Address</th> */}
                <th>Approve/Reject</th>
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
                  {/* <td>{users.address}</td> */}
                  <td id="approval-btn-containers">
                    <button
                      className="text-success"
                      onClick={() => {
                        hanldeApprove(users._id);
                      }}
                    >
                      {" "}
                      <FcCheckmark />{" "}
                    </button>
                    <button
                      className="text-danger"
                      onClick={() => {
                        handleReject(users._id);
                      }}
                    >
                      {" "}
                      <FaXmark />{" "}
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
            Moderator pending request not found.
          </h3>
        </div>
      )}
    </div>
  );
};

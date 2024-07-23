import React, { useEffect, useState } from "react";
import "../Admin.css";
import axiosInstance from "../../../apis/axiosInstance";
import { Table } from "react-bootstrap";
import { FcCheckmark } from "react-icons/fc";
import { FaXmark } from "react-icons/fa6";
import { toast } from "react-hot-toast";
import Form from "react-bootstrap/Form";
import { IoSearch } from "react-icons/io5";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
export const AdminViewAllModRequest = () => {
  const [data, setData] = useState([]);
  const [fixedData, setFixedData] = useState([]);
  console.log('test ', data);

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
          const data = res?.data?.data;
          setData(data || []);
          setFixedData(data || []);
        } else {
          setData([]);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  const handlechange = (e) => {
    const value = e.target.value;

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
                <th>Test score</th>
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
                  <td>{users.score}</td>
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
          <h3 className="text-center">Moderator pending request not found.</h3>
        </div>
      )}
    </div>
  );
};

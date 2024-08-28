import React, { useEffect, useState } from "react";
import "../Admin.css";
import axiosInstance from "../../../apis/axiosInstance";
import { Table } from "react-bootstrap";
import { FcCheckmark } from "react-icons/fc";
import { FaXmark } from "react-icons/fa6";
import { toast } from "react-hot-toast";
import { IoSearch } from "react-icons/io5";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
export const AdminViewAllDelRequest = () => {
  const [data, setData] = useState([]);
  const [fixedData, setFixedData] = useState();

  const hanldeApprove = (id) => {
    axiosInstance
      .get(`/approveDeliveryAgentById/${id}`)
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
      .get(`/rejectDeliveryAgentById/${id}`)
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
      .get("/allPendingDelivery")
      .then((res) => {
        if (res.status === 200) {
          let data = res.data?.data || [];
          data.reverse()
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
    getAllPendingRequest();
  }, []);

  console.log("pending data", data);

  const handleChange = (e) => {
    const value = e.target.value;
    if (value) {
      const filterData = fixedData.filter((items) => {
        const name = `${items.firstname}${items.lastname}`;
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
          <h4 className="mx-auto">Delivery agents requests</h4>
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
          onChange={handleChange}
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
                  <td>{users.address}</td>
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
        <div className="mt-5">
          <h3 className="text-center">No delivery agents requests.</h3>
        </div>
      )}
    </div>
  );
};

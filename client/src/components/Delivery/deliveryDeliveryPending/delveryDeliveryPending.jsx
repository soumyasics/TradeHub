import "./deliveryDeliveryPending.css";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance";
import { Table } from "react-bootstrap";
import { FcCheckmark } from "react-icons/fc";
import { FaXmark } from "react-icons/fa6";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const DeliveryRequest = () => {
  const [data, setData] = useState([]);
  const [deliveryAgent, setDeliveryAgent] = useState({});
  const [filterData, setFilterData] = useState([]);
  const [myRejectedDeliveries, setMyRejectedDeliveries] = useState([]);
  const [deliveryAgentId, setDeliveryAgentId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let id = localStorage.getItem("trade-hub-DAId") || null;
    if (id) {
      setDeliveryAgentId(id);
    } else {
      toast.error("Please login again.");
      navigate("/delivery/login");
    }
  }, []);
  const getAllPendingRequest = async () => {
    try {
      const response = await axiosInstance.get("getAllPendingDelivery");
      if (response.status === 200) {
        setData(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAllMyRejectedOrders = async () => {
    try {
      const res = await axiosInstance.get(
        `viewDeliveryById/${deliveryAgentId}`
      );
      if (res.status == 200) {
        const data = res?.data?.data || null;
        if (data) {
          setDeliveryAgent(res.data.data);
          setMyRejectedDeliveries(data?.rejectedOrders || []);
        }
      }
    } catch (err) {
      console.log("err on get my rejected orders", err);
    }
  };

  const toApprove = async (id) => {
    try {
      const response = await axiosInstance.patch(
        `acceptDeliveryReqById/${id}`,
        {
          deliveryAgentId,
        }
      );

      console.log("res2", response);
      if (response.status == 200) {
        toast.success("Approved sucessfully");
      }
    } catch (error) {
      console.log(error);
    } finally {
      getAllPendingRequest();
    }
  };

  const toReject = async (id) => {
    try {
      const response = await axiosInstance.patch(
        `rejectDeliveryReqById/${id}`,
        {
          deliveryAgentId,
        }
      );
      if (response.status == 200) {
        toast.success("Rejected sucessfully");
      }
    } catch (error) {
      console.log("error on reject", error);
    } finally {
      getAllPendingRequest();
      getAllMyRejectedOrders();
    }
  };

  useEffect(() => {
    getAllPendingRequest();
    if (deliveryAgentId) {
      getAllMyRejectedOrders();
    }
  }, [deliveryAgentId]);

  const handleApprove = (id) => {
    toApprove(id);
  };

  const handleReject = (id) => {
    toReject(id);
  };

  useEffect(() => {
    if (data.length > 0 && myRejectedDeliveries.length > 0) {
      const newData = data.filter((item) => {
        return !myRejectedDeliveries.includes(item._id);
      });
      setFilterData(newData);
    } else {
      setFilterData(data);
    }
  }, [data, myRejectedDeliveries]);

  return (
    <div className="pt-5">
      {filterData.length > 0 && (
        <div className="text-center">
          <h4 className="mx-auto">Recent Delivery requests</h4>
        </div>
      )}

      {filterData.length !== 0 ? (
        <div style={{ overflowY: "scroll", height: "80vh", width: "95%" }}>
          <Table
            striped
            hover
            className="deliveryDeliveryPending-table"
            responsive
            id="delivery-table-container"
          >
            <thead>
              <tr>
                <th>Item No</th>
                <th>Item Name</th>
                <th> Customer Name</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Approve/Reject</th>
              </tr>
            </thead>
            <tbody>
              {filterData.map((users, index) => {
                const buyerId = users?.buyerId;
                const buyerProductId = users?.buyerProductId;
                const sellerId = users?.sellerId;
                const sellerProductId = users?.sellerProductId;
                return (
                  <>
                    <React.Fragment key={users._id}>
                      <tr>
                        <td rowSpan={2} className="py-4">
                          {index + 1}
                        </td>
                        <td>{buyerProductId?.name}</td>
                        <td>
                          {buyerId.firstname} {users.lastname}
                        </td>
                        <td>{buyerId.contact}</td>
                        <td>{buyerProductId?.address}</td>
                        <td rowSpan={2} id="delivery-approval-btn-containers">
                          <button
                            className="text-success"
                            onClick={() => {
                              handleApprove(users._id);
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
                      <tr>
                        <td>{sellerProductId?.name}</td>
                        <td>
                          {sellerId?.firstname} {sellerId?.lastname}
                        </td>
                        <td>{sellerId?.contact}</td>
                        <td>{sellerProductId?.address}</td>
                        <td></td>
                      </tr>
                    </React.Fragment>
                  </>
                );
              })}
            </tbody>
          </Table>
        </div>
      ) : (
        <div>
          <h3 className="text-center">Delivery request not found.</h3>
        </div>
      )}
    </div>
  );
};

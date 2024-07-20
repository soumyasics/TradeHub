import "./deliveryDeliveryPending.css";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../../apis/axiosInstance";
import { Table } from "react-bootstrap";
import { FcCheckmark } from "react-icons/fc";
import { FaXmark } from "react-icons/fa6";
import {toast} from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const DeliveryDeliveryPending = () => {
  const [data, setData] = useState([]);
  const [deliveryAgentId, setDeliveryAgentId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let id = localStorage.getItem("trade-hub-DAId") || null;
    if (id) {
      setDeliveryAgentId(id);
    }else {
      toast.error("Please login again.");
      navigate("/delivery/login");
    }
  }, [])
  const getAllPendingRequest = async () => {
    try {
      const response = await axiosInstance.get("getAllPendingDelivery");
      console.log("response", response);
      if (response.status === 200) {
        console.log("fgf",response);  
        setData(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toApprove = async (id) => {
    try {
      const response = await axiosInstance.patch(
        `acceptDeliveryReqById/${id}`, {
          deliveryAgentId
        }
      );

      console.log("res2",response)
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
      const response = await axiosInstance.patch(`rejectDeliveryReqById/${id}`, {
        deliveryAgentId
      });
      if (response.status == 200) {
        toast.success("Rejected sucessfully");
      }
    } catch (error) {
      console.log("error on reject",error);
    } finally {
      getAllPendingRequest();
    }
  };

  useEffect(() => {
    getAllPendingRequest();
  }, []);

  const handleApprove = (id) => {
    toApprove(id);
  };

  const handleReject = (id) => {
    toReject(id);
  };

  return (
    <div className="pt-5">
      {data.length > 0 && (
        <div className="text-center">
          <h4 className="mx-auto">Recent Delivery requests</h4>
        </div>
      )}

      {data.length !== 0 ? (
        <div
          style={{ overflowY: "scroll", height: "80vh", width: "95%" }}
        >
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
              {data.map((users, index) => {
                const buyerId = users.buyerId;
                const buyerProductId = users.buyerProductId;
                const sellerId = users.sellerId;
                const sellerProductId = users.sellerProductId;
                return (
                  <>
                    <React.Fragment key={users._id}>
                      <tr>
                        <td rowSpan={2} className="py-4">
                          {index + 1}
                        </td>
                        <td>{buyerProductId.name}</td>
                        <td>
                          {buyerId.firstname} {users.lastname}
                        </td>
                        <td>{buyerId.contact}</td>
                        <td>{buyerProductId.address}</td>
                        <td rowSpan={2} id="delivery-approval-btn-containers">
                          <button
                            className="text-success"
                            onClick={()=>{handleApprove(users._id)}}
                          >
                            {" "}
                            <FcCheckmark />{" "}
                          </button>
                          <button
                            className="text-danger"
                            onClick={()=>{handleReject(users._id)}}
                          >
                            {" "}
                            <FaXmark />{" "}
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>{sellerProductId.name}</td>
                        <td>
                          {sellerId.firstname} {sellerId.lastname}
                        </td>
                        <td>{sellerId.contact}</td>
                        <td>{sellerProductId.address}</td>
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

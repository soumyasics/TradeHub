import React, { useState, useEffect } from "react";
import { HiUserGroup } from "react-icons/hi2";
import { MdAddModerator } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { TbTruckDelivery } from "react-icons/tb";
import "../Admin.css";
import axiosInstance from "../../../apis/axiosInstance";
import { AdminRecentMOdReq } from "../adminRecentModReq/adminRecentModReq";
import { AdminRecentddReq } from "../adminRecentddReq/adminRecentddReq";
export const AdminOverview = () => {
  const [users, setUsers] = useState([]);
  const [moderator, setModerator] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const [delivery, setDelivery] = useState([]);

  useEffect(() => {
    getAllUsers();
    getAllMods()
    getAllDelivery()
  }, []);

  const getAllUsers = async () => {
    try {
      const res = await axiosInstance.post("viewUsers");
      if (res.data.status === 200) {
        const data = res.data?.data || [];
        setUsers(data);
      } else {
        console.log("respo", res);
      }
    } catch (error) {
      console.log("all users", error);
    }
  };

  const getAllMods = async () => {
    try {
      const res = await axiosInstance.post("viewModerators");
      if (res.data.status === 200) {
        const data = res.data?.data || [];
        setModerator(data);
      } else {
        console.log("respo", res);
      }
    } catch (error) {
      console.log("all users", error);
    }
  };

  const getAllDelivery = async() =>
    {
      try {
        const response = await axiosInstance.get("/getAllDeliveredOrders")
        if (response.status == 200)
        {
          setDelivery(response.data.data)
        }
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <div>
      <div className="container">
        <div className="admin-dash-div1">
          <section className="pt-5">
            <div className="row container">
              <div className="col-12 col-sm-6 col-md-3 mb-4">
                <div className="admin-dash-revenue-box">
                  {/*  */}
                  <div className="row">
                    <div className="col-5">
                      <HiUserGroup className="admin-dash-icon" />
                    </div>
                    <div className="col-7">
                      <span>
                        <p className="admin-dash-span">
                          Total number<br></br>of users
                        </p>
                      </span>
                      <span className="admin-dash-length">{users.length}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-3 mb-4">
                <div className="admin-dash-order-box">
                  <div className="row">
                    <div className="col-5">
                      <MdAddModerator className="admin-dash-icon" />
                    </div>
                    <div className="col-7">
                      <span>
                        <p className="admin-dash-span">
                          Total number of moderator
                        </p>
                      </span>
                      <span className="admin-dash-length">
                        {moderator.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-3 mb-4">
                <div className="admin-dash-products-box">
                  <div className="row">
                    <div className="col-5">
                      <GiReceiveMoney className="admin-dash-icon" />
                    </div>
                    <div className="col-7">
                      <span>
                        <p className="admin-dash-span">
                          Total number of transaction
                        </p>
                      </span>
                      <span className="admin-dash-length">
                        {transaction.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-3 mb-4">
                <div className="admin-dash-user-box">
                  <div className="row">
                    <div className="col-5">
                      <TbTruckDelivery className="admin-dash-icon" />
                    </div>
                    <div className="col-7">
                      <span>
                        <p className="admin-dash-span">
                          Total number of deliveries
                        </p>
                      </span>
                      <span className="admin-dash-length">
                        {delivery.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      {/* <AdminRecentMOdReq/>
      <AdminRecentddReq/> */}
    </div>
  );
};

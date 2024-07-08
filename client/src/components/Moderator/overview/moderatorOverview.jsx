import React, { useState, useEffect } from "react";
import { HiUserGroup } from "react-icons/hi2";
import { MdAddModerator } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import productSvg from "../../../assets/svg/product-icon.svg";
import { TbTruckDelivery } from "react-icons/tb";
import "../Moderator.css";
import axiosInstance from "../../../apis/axiosInstance";
export const ModeratorOverview = () => {
  const [users, setUsers] = useState([]);
  const [moderator, setModerator] = useState([]);
  const [products, setProducts] = useState([]);
  const [delivery, setDelivery] = useState([]);

  useEffect(() => {
    getAllUsers();
    getAllMods();
    getAllProducts();
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
  const getAllProducts = async () => {
    try {
      const res = await axiosInstance.post("viewActiveItems");
      if (res.data.status === 200) {
        const data = res.data?.data || [];
        setProducts(data);
      } else {
        console.log("products", res);
      }
    } catch (error) {
      console.log("products !", error);
    }
  };

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
                          Total number<br></br>of products
                        </p>
                      </span>
                      <span className="admin-dash-length">
                        {products.length}
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
                          Total number<br></br>of deliveries
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
    </div>
  );
};

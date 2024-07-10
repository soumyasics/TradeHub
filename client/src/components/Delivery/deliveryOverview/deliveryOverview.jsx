import React, { useState, useEffect } from "react";
import { HiUserGroup } from "react-icons/hi2";
import { MdAddModerator } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import productSvg from "../../../assets/svg/product-icon.svg";
import { TbTruckDelivery } from "react-icons/tb";
export const DeliveryOverview = () => {
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
                      <span className="admin-dash-length"></span>
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
    )
}
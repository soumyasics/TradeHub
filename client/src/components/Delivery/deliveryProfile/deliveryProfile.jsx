import React, { useEffect, useState } from "react";
import "./deliveryProfle.css"
import Card from "react-bootstrap/Card";
import axiosInstance from "../../../apis/axiosInstance";
import { BASE_URL } from "../../../apis/baseURL";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { DeliveryEditProfileCard } from "../deliveryEditProfileCard/deliveryEditProfileCard";
// import { UsereditProfileCard } from "../../Users/userEditProfileCard/userEditProfileCard";
// import { ModEditProfileCard } from "../modEditProfileCard/modEditProfileCard";

export const DeliveryProfile = () => {
  const [activeUserId, setActiveUserId] = useState(null);
  const [delData, setDelData] = useState(null);
  const navigate = useNavigate();

  const fetchDelData = async (DelId) => {
    try {
      const res = await axiosInstance.get(`/viewDeliveryById/${DelId}`);
      const data = res.data?.data || null;
      console.log("resp", res);
      setDelData(data);
    } catch (error) {
      console.log("get Del data by id =>", error);
    }
  };

  useEffect(() => {
    const DelId = localStorage.getItem("trade-hub-DAId") || null;
    if (!DelId) {
      toast.error("Please login again.");
      navigate("/delivery/login")
      return;
    }

    fetchDelData(DelId);  
  }, []);


  
  return (
    <div>
     
      <div className="user-profile-div container">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8 mt-5">
            <Card className="delivery-profile-card mb-5">
              <div className="text-center user-profile-imgdiv">
                {console.log(`${BASE_URL}${delData?.profile?.filename}`)}
                <img
                  src={`${BASE_URL}${delData?.profile?.filename}`}
                  className="user-profile-img"
                />
              </div>
              <Card.Body>
                <Card.Title className="moderator-profile-firstName">{delData?.firstname|| "Loading.."}</Card.Title>
                <Card.Text className="mt-3">
                  <div className="row container">
                    <div className="col container ms-5">
                      <label className="mt-5">Email </label>
                      <br></br>
                      <label className="mt-5">Phone number</label>
                      <br></br>
                      <label className="mt-5">Gender</label>
                    </div>
                    <div className="col container">
                      <label className="mt-5 ms-5">:</label> <br></br>
                      <label className="mt-5 ms-5">:</label> <br></br>
                      <label className="mt-5 ms-5">:</label> <br></br>
                    </div>
                    <div className="col">
                      <label className="mt-5">{delData?.email|| "Loading.."} </label>
                      <br></br>
                      <label className="mt-5">{delData?.contact || "Loading.."}</label>
                      <br></br>
                      <label className="mt-5">{delData?.gender || "Loading.."}</label>
                    </div>
                  </div>
                  <div className="mt-5 text-center">
                    {/* <button type="submit" className="user-profile-btnedit">
                      <Link
                        to={`/user/user-editprofile/${activeUserId}`}
                        className="useredit-profile-color-link"
                      >
                        Edit
                      </Link>
                    </button> */}

                     <DeliveryEditProfileCard getNewData={fetchDelData}/> 
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    </div>
  );
};

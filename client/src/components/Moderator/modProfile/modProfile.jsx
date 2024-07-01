import React, { useEffect, useState } from "react";
import "./modProfile.css";
import { FaArrowLeft } from "react-icons/fa6";
import Card from "react-bootstrap/Card";
import axiosInstance from "../../../apis/axiosInstance";
import { BASE_URL } from "../../../apis/baseURL";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ModNavbar } from "../../homeComponents/Navbar/Navbar";

export const ModProfile = () => {
  const [activeUserId, setActiveUserId] = useState(null);
  const [modData, setModData] = useState(null);
  const navigate = useNavigate();

  const fetchModData = async (modId) => {
    try {
      const res = await axiosInstance.get(`/viewModeratorById/${modId}`);
      const data = res.data?.data || null;
      console.log("resp", res);
      setModData(data);
    } catch (error) {
      console.log("get mod data by id =>", error);
    }
  };

  useEffect(() => {
    const modId = localStorage.getItem("trade-hub-modId") || null;
    if (!modId) {
      toast.error("Please login again.");
      navigate("/moderator/login");
      return;
    }

    fetchModData(modId);
  }, []);

  return (
    <div>
      <ModNavbar />
      <div className="mt-5 ms-5">
        <Link to="/moderator/home">
          <FaArrowLeft className="user-profile-icon" />{" "}
          <span className="user-profile-para ms-3 mt-3"> Profile</span>
        </Link>
      </div>
      <div className="user-profile-div container">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8 mt-5">
            <Card className="user-profile-card mb-5">
              <div className="text-center user-profile-imgdiv">
                {console.log(`${BASE_URL}${modData?.profile?.filename}`)}
                <img
                  src={`${BASE_URL}${modData?.profile?.filename}`}
                  className="user-profile-img"
                />
              </div>
              <Card.Body>
                <Card.Title></Card.Title>
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
                      <label className="mt-5">{modData?.email|| "Loading.."} </label>
                      <br></br>
                      <label className="mt-5">{modData?.contact || "Loading.."}</label>
                      <br></br>
                      <label className="mt-5">{modData?.gender || "Loading.."}</label>
                    </div>
                  </div>
                  <div className="mt-5 text-center">
                    <button type="submit" className="user-profile-btnedit">
                      <Link
                        to={`/user/user-editprofile/${activeUserId}`}
                        className="useredit-profile-color-link"
                      >
                        Edit
                      </Link>
                    </button>
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

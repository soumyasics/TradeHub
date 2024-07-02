import "./viewItems.css";
import img1 from "../../../../assets/images/viewItemsImage.png";
import img2 from "../../../../assets/images/userViewItemsDelete.svg";
import UserMainNav from "../../UserMainNav";
import Footer from "../../../Footer/Footer";
import { toast } from "react-hot-toast";
import axiosInstance from "../../../../apis/axiosInstance";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../../apis/baseURL";
import { useNavigate } from "react-router-dom";
export const ViewItems = () => {
  const userItems = [
    {
      ItemsName: "Airpods",
      category: "Electonics",
      ItemDescription:
        "Airpods with 35hrs playback,13mm Drives blutooth headset",
    },
    {
      ItemsName: "Airpods",
      category: "Electonics",
      ItemDescription:
        "Airpods with 35hrs playback,13mm Drives blutooth headset",
    },
    {
      ItemsName: "Airpods",
      category: "Electonics",
      ItemDescription:
        "Airpods with 35hrs playback,13mm Drives blutooth headset",
    },
    {
      ItemsName: "Airpods",
      category: "Electonics",
      ItemDescription:
        "Airpods with 35hrs playback,13mm Drives blutooth headset",
    },
  ];

  const navigate = useNavigate();
  const [myItems, setMyItems] = useState([]);
  const [proPic, setProPic] = useState("");
  useEffect(() => {
    let id = localStorage.getItem("trade-hub-userId") || null;
    console.log("iddd", id);
    if (id) {
      // id =
      getItems(id);
    } else {
      toast.error("Please login again.");
      navigate("/user/login");
    }
  }, []);

  const getItems = (id) => {
    axiosInstance
      .get(`viewAllitemsByUserId/${id}`)
      .then((res) => {
        if (res.status === 200) {
          console.log("respo", res);
          let data = res?.data?.data || [];
            data.reverse()
          setMyItems(data);
        } else {
          console.log("view user by id", res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log("my ite", myItems);

  return (
    <>
      <UserMainNav />
      <div className="user-viewItems-body">
        <h1 className="user-viewItems-heading text-center">My items</h1>

        {myItems.map((e) => {
          const filename = e.itemPhoto?.filename || "";
          let pic;
          if (filename) {
            pic = `${BASE_URL}${filename}`;
          }
          return (
            <div key={e._id}>
              <div className="user_viewItems-box">
                <div class="container text-center">
                  <div class="row">
                    <div class="col-4 user-viewItems-left-box">
                      <img style={{ width: "50%" }} src={pic} alt="Item" />
                    </div>
                    <div class="col-6 user-viewItems-middle-box">
                      <table>
                        <thead>
                          <tr>
                            <td>Items name</td>
                            <td>:</td>
                            <td className="user-view_Items-data">{e.name}</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Category</td>
                            <td>:</td>
                            <td className="user-view_Items-data">
                              {e.category}
                            </td>
                          </tr>
                          <tr>
                            <td>Item description</td>
                            <td>:</td>
                            <td className="user-view_Items-data">
                              {e.description}
                            </td>
                          </tr>
                          <tr>
                            <td>Item quantity</td>
                            <td>:</td>
                            <td className="user-view_Items-data">
                              {e.quantity}
                            </td>
                          </tr>
                          <tr>
                            <td> Location</td>
                            <td>:</td>
                            <td className="user-view_Items-data">
                              {e.location}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="col-2 user-viewItems-right-box">
                      <div className="userView-right-inner-box">
                        <div className="userItemView-pending bg-danger"></div>
                        <p>{e.isModApproved ? "Approved" : "Pending"}</p>
                      </div>
                      <img src={img2} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              ;
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
};

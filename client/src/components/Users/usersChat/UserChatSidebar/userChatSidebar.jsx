import "./userChatSidebar.css";
import img1 from "../../../../assets/images/girl.png";
import axiosInstance from "../../../../apis/axiosInstance";
import { BASE_URL } from "../../../../apis/baseURL";
import { useEffect, useState } from "react";
export const UserChatSidebar = () => {
  const [data, setData] = useState([{ profile: { filename: "" } }]);
  const getData = async () => {
    try {
      const res = await axiosInstance.post("/viewUsers");
      console.log(res);
      if (res.data.status == 200) {
        setData(res.data.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="chatSidebar-body">
        <input
          type="text"
          placeholder="Search"
          className="chatSidebar-search"
        />
        {data.map((e) => {
          return (
            <div>
              <div className="chatSidebar-view-users d-flex">
                <img src={`${BASE_URL}${e?.profile?.filename}`} alt="" />
                <p>{e.firstname}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

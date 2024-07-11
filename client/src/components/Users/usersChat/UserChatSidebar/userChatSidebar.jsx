import axiosInstance from "../../../../apis/axiosInstance";
import { BASE_URL } from "../../../../apis/baseURL";
import { useEffect, useState } from "react";
import "./userChatSidebar.css";
export const UserChatSidebar = ({ senderId, selectingUser }) => {
  const [data, setData] = useState([{ profile: { filename: "" } }]);
  const getData = async () => {
    try {
      const res = await axiosInstance.post("viewUsers");
      console.log(res);
      if (res.data.status == 200) {
        const users = res.data?.data || [];
        const removeSender = users.filter((user) => user._id !== senderId);
        setData(removeSender);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getData();
  }, [senderId]);

  return (
    <div className="chatSidebar-body">
      <input type="text" placeholder="Search" className="chatSidebar-search" />
      {data.map((e) => {
        return (
          <div
            onClick={() => {
              selectingUser(e._id);
            }}
            className="chatSidebar-view-users d-flex"
          >
            <img src={`${BASE_URL}${e?.profile?.filename}`} alt="" />
            <p>{e.firstname}</p>
          </div>
        );
      })}
    </div>
  );
};

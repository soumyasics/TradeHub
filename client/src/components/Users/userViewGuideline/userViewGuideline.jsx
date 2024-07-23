import { useEffect, useState } from "react";
import "./userViewGuideline.css";
import axiosInstance from "../../../apis/axiosInstance";
import toast from "react-hot-toast";
import { UserChatNavbar } from "../usersChat/userChatNavbar/userChatNavbar";
export const UserViewGuideline = () => {
  const [state, setState] = useState("");
  useEffect(() => {
    axiosInstance
      .get("/viewGuideline")
      .then((res) => {
        if (res.data.status == 200) {
          console.log(res);
          setState(res.data.data)
        }
        else
        {

        }
      })
      .catch((err) => {
        toast.error(err.data.msg)
   });
  }, []);
  return (
   <div>
    <UserChatNavbar/>
     <div style={{ minHeight: "100vh" }} className="userViewGuideline-body">
      <h1 className="userViewGuideline-heading">{state.title}</h1>
      {/* <h3>Content</h3> */}
      <p>
        {state.content}
      </p>

    </div>
   </div>
  );
};

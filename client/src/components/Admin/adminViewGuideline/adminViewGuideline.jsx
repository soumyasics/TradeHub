import { useEffect, useState } from "react";
import "./admineViewGuideline.css";
import axiosInstance from "../../../apis/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export const AdmineViewGuideline = () => {
  const [state, setState] = useState("");
  
  const navigate = useNavigate()
  
  useEffect(() => {
    axiosInstance
      .get("/viewGuideline")
      .then((res) => {
        if (res.data.status == 200) {
          console.log(res);
          setState(res.data.data)
        }
      })
      .catch((err) => {
        toast.error(err.data.msg)
   });
  }, []);
  return (
    <div style={{ minHeight: "100vh" }} className="admineViewGuideline-body">
      <h1 className="admineViewGuideline-heading">{state.title}</h1>
      <p style="text-indent: 50px">
        {state.content}
      </p>
      
      {/* for update the guideline */}
      {/* <button className="adminViewGuideline-button " onClick={()=>{navigate("/admin/update-guideline")}}>update</button> */}

</div>

  );
};

import approveTick from "../../../assets/images/approve-tick.png";
import "./approvedBtn.css";
import { IoCloseCircleSharp } from "react-icons/io5";
export const ApprovedBtn = () => {
  return (
    <button className="approve-btn">
      Approved <img src={approveTick} alt=".." />
    </button>
  );
};

export const RejectedBtn = () => {
  return (
    <button className="reject-btn">
      Rejected <IoCloseCircleSharp  fontSize="30px"/>
    </button>
  );
};


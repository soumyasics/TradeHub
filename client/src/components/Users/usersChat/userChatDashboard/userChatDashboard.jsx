import { useEffect, useState } from "react";
import { UserChatSidebar } from "../UserChatSidebar/userChatSidebar";
import { NoUserSelected } from "../noUserSelected/noUserSelected";
import { UserchatInterFace } from "../userChatInterface/userChatInterface";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { UserChatNavbar } from "../userChatNavbar/userChatNavbar";
import { UserChatFooter } from "../userNavbarFooter/userChatFooter";
export const UserChatDashboard = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const [senderId, setSenderId] = useState("");
  const selectingUser = (value) => {
    setSelectedUser(value);
  };
  const navigate = useNavigate();
  useEffect(() => {
    const id = localStorage.getItem("trade-hub-userId") || null;
    if (id) {
      setSenderId(id);
    } else {
      toast.error("Please login again.");
      navigate("/user/login");
    }
  }, []);
  return (
    
    <div>
      <UserChatNavbar/>
    <div className="row">
      <div className="col-4">
        <UserChatSidebar senderId={senderId} selectingUser={selectingUser} />
      </div>
      {selectedUser ? (
        <div className="col-8">
          <UserchatInterFace senderId={senderId} receiverId={selectedUser} />
        </div>
      ) : (
        <div className="col-8">
          <NoUserSelected />
        </div>
      )}
      <UserChatFooter/>
    </div>
    </div>
  );
};

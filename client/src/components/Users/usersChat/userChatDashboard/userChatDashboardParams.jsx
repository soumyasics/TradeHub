import { useEffect, useState } from "react";
import { UserChatSidebar } from "../UserChatSidebar/userChatSidebar";
import { NoUserSelected } from "../noUserSelected/noUserSelected";
import { UserchatInterFace } from "../userChatInterface/userChatInterface";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { UserChatNavbar } from "../userChatNavbar/userChatNavbar";
import { UserChatFooter } from "../userNavbarFooter/userChatFooter";
export const UserChatDashboardParams = () => {
  const { id } = useParams();
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

  useEffect(() => {
    if (id) {
      setSelectedUser(id);
    }
  }, [id]);

  console.log("select", selectedUser)
  return (
    <div>
      <UserChatNavbar />
      <div className="row">
        <div className="col-4">
          <UserChatSidebar senderId={senderId} selectingUser={selectingUser} selectedUser={selectedUser} />
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
      </div>
    </div>
  );
};

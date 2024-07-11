import { useEffect, useState } from "react";
import axiosInstance from "../../../../apis/axiosInstance";
import "./userChatInterface.css";
import { FaRegKeyboard } from "react-icons/fa6";
import { toast } from "react-hot-toast";

export const UserchatInterFace = ({ receiverId, senderId }) => {
  const [message, setMessage] = useState("");
 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) {
      toast.error("Type message");
      return;
    }
    if (!senderId || !receiverId) {
      console.log("ids", senderId, receiverId);
      return;
    }

    const obj = { message, senderId, receiverId };
    sendDataToServer(obj);
  };
  const sendDataToServer = async (data) => {
    try {
      const res = await axiosInstance.post("sendMessageToUser", data);
      if (res.status === 200) {
        console.log("respon", res)
      }
    } catch (error) {
        console.log("Error on sending message,", error);
    } finally {
        setMessage("")
    }
  };

  
  return (
    <div className="userChatInterface-body">
     
     <div id="display-user-messages">

      <div className="userChatInterface-chat1">
        <p>Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...</p>
      </div>
      <div className="userChatInterface-chat2">
        <p>Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content</p>
      </div>
      <div className="userChatInterface-chat1">
        <p>Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...</p>
      </div>
      <div className="userChatInterface-chat2">
        <p>Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content</p>
      </div>
      <div className="userChatInterface-chat1">
        <p>Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...</p>
      </div>
      <div className="userChatInterface-chat2">
        <p>Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content</p>
      </div>
      <div className="userChatInterface-chat1">
        <p>Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...</p>
      </div>
      <div className="userChatInterface-chat2">
        <p>Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content</p>
      </div>
      <div className="userChatInterface-chat1">
        <p>Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...</p>
      </div>
      <div className="userChatInterface-chat2">
        <p>Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content</p>
      </div>
      <div className="userChatInterface-chat1">
        <p>Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...</p>
      </div>
      <div className="userChatInterface-chat2">
        <p>Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content</p>
      </div>
      <div className="userChatInterface-chat1">
        <p>Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...</p>
      </div>
      <div className="userChatInterface-chat2">
        <p>Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content here...Some content</p>
      </div>


     </div>

      <form className="d-flex userChatInterface-input" onSubmit={handleSubmit}>
        <FaRegKeyboard className="userChatInterface-keyboard-icon" />
        <input
          type="text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          placeholder="Type a message"
          className="userChatInterface-input"
        />
      </form>
    </div>
  );
};

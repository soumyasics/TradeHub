import "./userChatInterface.css";
import { FaRegKeyboard } from "react-icons/fa6";

export const UserchatInterFace = () => {
  let userChat =[
        {user1message1:"hnnbnb"},      
        {user2message1:"dfdfgdf"},
     
    ]
  return (
    <div className="userChatInterface-body">
      {
        userChat.map((e)=>
        {
            return(
                <div>
                <div className="userChatInterface-chat1">
                <p>{}</p>
              </div>
              <div className="userChatInterface-chat2">
                <p>aaaaa</p>
              </div>
                </div>
            )
        })
      }
    

      <div className="d-flex userChatInterface-input">
        <FaRegKeyboard className="userChatInterface-keyboard-icon" />
        <input
          type="text"
          placeholder="Type a message"
          className="userChatInterface-input"
        />
      </div>
    </div>
  );
};

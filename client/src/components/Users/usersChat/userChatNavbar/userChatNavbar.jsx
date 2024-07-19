import { useNavigate } from "react-router-dom";
import "./userChatNavBar.css"
import { FaArrowLeft } from "react-icons/fa";
export const UserChatNavbar = () =>
{
    const Navigate = useNavigate()
    return(
        <div className="userChatNavbar-body">
             <FaArrowLeft className="userChatNavbar-left-arrow" onClick={()=>{Navigate(-1)}}/>
        </div>
    )
}
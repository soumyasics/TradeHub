import React from 'react'
import './moderatorSidebar.css'
import moderatorsidebarimg from '../../../assets/images/adminsidebarimg.png'
import { IoIosNotificationsOutline } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { BsBox } from "react-icons/bs";
import { PiShootingStarThin } from "react-icons/pi";
import { FaUsers } from "react-icons/fa6";
import { GiCardExchange } from "react-icons/gi";
import { MdLogout } from "react-icons/md";
function ModeratorSidebar() {
    return (
        <div>
            <div className="moderator-sidebar-color">
                <div className="moderator-sidebar-logotext d-flex  align-items-center">
                    <img
                        className="moderator-sidebar-img"
                        src={moderatorsidebarimg}
                        style={{ width: "30px", height: "30px" }}
                        alt="img"
                    ></img>
                    &nbsp; &nbsp;
                    <div className="mt-3">Moderator </div>
                    <div className='notifiactionIcon'>
                        <IoIosNotificationsOutline />
                    </div>
                </div>
                <div className="mt-4">
                    <ol className="moderator-sidebar-list" style={{ fontSize: "14px" }}>
                        <li>
                            <span className='contentIcons'>
                                <RxDashboard />
                            </span>
                            Dashboard
                        </li>
                        <li>
                            <span className='contentIcons'>
                                <BsBox />
                            </span>
                            Items
                        </li>
                        <li>
                        <span className='contentIcons'>
                        <PiShootingStarThin />
                            </span>
                            item Review
                        </li>
                        <li>
                        <span className='contentIcons'>
                        <FaUsers />
                            </span>
                            Users
                        </li>
                        <li>
                        <span className='contentIcons'>
                        <GiCardExchange />
                            </span>
                            Exchanged Items
                        </li>
                        <li className="text-danger fw-bold ">
                        <span className='contentIcons'>
                        <MdLogout />
                            </span>
                            <span className=" ms-1">Logout</span>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
    )
}

export default ModeratorSidebar
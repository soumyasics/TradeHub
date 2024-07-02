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
function ModeratorSidebar({changeSelectedPage}) {
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
                        <li onClick={()=>changeSelectedPage("productrequest")}>
                            <span className='contentIcons'>
                                <RxDashboard />
                            </span>
                            Dashboard
                        </li>
                        <li onClick={()=>changeSelectedPage("itempage")}>
                            <span className='contentIcons'>
                                <BsBox />
                            </span>
                            Items
                        </li>
                        <li>
                            <span className='contentIcons'>
                                <PiShootingStarThin />
                            </span>
                            <p class="d-inline-flex gap-1">
                                <button class="reviewbtn" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                                    item Review
                                </button>
                            </p>
                            <div class="collapse collapse-drop" id="collapseExample">
                                <div class="card card-body">
                                <span className='collapse-dropbody'>
                                <li>Approved items</li>
                                <li>Rejected items</li>
                                </span>
                                   
                                  
                                </div>
                            </div>
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
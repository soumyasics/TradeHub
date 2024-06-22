import React from 'react'
import './User.css';
import { FaArrowLeft } from "react-icons/fa6";
import UserMainNav from './UserMainNav';
import Card from 'react-bootstrap/Card';
import dp from '../../assets/images/dp.jpg'

function UserProfile() {
  return (
    <div>
        <UserMainNav/>
        <div className='mt-5 ms-5'>
            <FaArrowLeft className='user-profile-icon'/> <span className='user-profile-para ms-3 mt-3'> Profile</span>
        </div>
        <div className='user-profile-div container'>
            <div className='row'>
                <div className='col-2'></div>
                <div className='col-8 mt-5'>
                    <Card className='user-profile-card'>  
                        <img src={dp} className='user-profile-img'></img>   
                        <Card.Body>
                            <Card.Title></Card.Title>
                            <Card.Text className='mt-5'>
                                <div className='row container'>
                                    <div className='col container ms-5'>
                                        <label className='mt-5'>Email </label><br></br>
                                        <label className='mt-5'>Phone number</label><br></br>
                                        <label className='mt-5'>Gender</label>
                                    </div>
                                    <div className='col container'>
                                       <label className='mt-5'>:</label> <br></br>
                                       <label className='mt-5'>:</label> <br></br>
                                       <label className='mt-5'>:</label> <br></br>
                                    </div>
                                    <div className='col container'>
                                        <label className='mt-5'>Email </label><br></br>
                                        <label className='mt-5'>Phone number</label><br></br>
                                        <label className='mt-5'>Gender</label>
                                    </div>
                                </div>
                            </Card.Text>       
                        </Card.Body>
                    </Card>
                </div>
                <div className='col-2'></div>
            </div>
        
      </div>
    </div>  
  )
}

export default UserProfile

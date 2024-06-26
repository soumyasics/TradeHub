import React, { useEffect, useState } from 'react'
import './User.css';
import { FaArrowLeft } from "react-icons/fa6";
import UserMainNav from './UserMainNav';
import Card from 'react-bootstrap/Card';
import dp from '../../assets/images/dp.jpg'
import axiosInstance from '../../apis/axiosInstance';
import { BASE_URL } from '../../apis/baseURL';
import { Link } from 'react-router-dom';

function UserProfile() {
    
    const[data,setData]=useState({profile:{filename:''}});
    const id=localStorage.getItem('userId')
    console.log(id);

    useEffect(() => {
        axiosInstance.post(`viewUserById/${id}`)
        .then((res) => {
            console.log(res);
            setData(res.data.data)
            console.log(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        })
    },[])
  return (
    <div>
        <UserMainNav/>
        <div className='mt-5 ms-5'>
           <Link to='/user/home'><FaArrowLeft className='user-profile-icon'/> <span className='user-profile-para ms-3 mt-3'> Profile</span></Link> 
        </div>
        <div className='user-profile-div container'>
            <div className='row'>
                <div className='col-2'></div>
                <div className='col-8 mt-5'>
                    <Card className='user-profile-card mb-5'> 
                        <div className='text-center user-profile-imgdiv'>
                            {console.log(`${BASE_URL}${data.profile.filename}`)}
                        <img src={`${BASE_URL}${data.profile.filename}`} className='user-profile-img'/>    
                        </div> 
                        <Card.Body>
                            <Card.Title></Card.Title>
                            <Card.Text className='mt-3'>
                                <div className='row container'>
                                    <div className='col container ms-5'>
                                        <label className='mt-5'>Email </label><br></br>
                                        <label className='mt-5'>Phone number</label><br></br>
                                        <label className='mt-5'>Gender</label>
                                    </div>
                                    <div className='col container'>
                                       <label className='mt-5 ms-5'>:</label> <br></br>
                                       <label className='mt-5 ms-5'>:</label> <br></br>
                                       <label className='mt-5 ms-5'>:</label> <br></br>
                                    </div>
                                    <div className='col'>
                                        <label className='mt-5'>{data.email} </label><br></br>
                                        <label className='mt-5'>{data.contact}</label><br></br>
                                        <label className='mt-5'>{data.gender}</label>
                                    </div>
                                </div>
                                <div className='mt-5 text-center'>
                                    <button type='submit' className='user-profile-btnedit'>
                                       <Link to={`/user/user-editprofile/${id}`} className='useredit-profile-color-link'>Edit</Link> 
                                    </button>
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

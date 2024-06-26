import React, { useEffect, useState } from 'react';
import './User.css';
import { FaArrowLeft } from "react-icons/fa";
import { RxPencil2 } from "react-icons/rx";
import dp from '../../assets/images/dp.jpg';
import { Link } from 'react-router-dom';
import axiosInstance from '../../apis/axiosInstance';
import { BASE_URL } from '../../apis/baseURL';
import axiosMultipartInstance from '../../apis/axiosMultipartInstance';

function UserEditProfile() {
    const [data, setData] = useState({
        firstname: '',
        gender: '',
        email: '',
        contact: '',
        profile: { filename: '' }
    });
    const id = localStorage.getItem('userId');
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        axiosInstance.post(`viewUserById/${id}`)
            .then((res) => {
                setData(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files, type } = e.target;
        if (type === 'file') {
            const file = files[0];
            setProfileImage(file);
            setData((prevData) => ({
                ...prevData,
                profile: { filename: file.name }
            }));
        } else {
            setData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('firstname', data.firstname);
        formData.append('gender', data.gender);
        formData.append('email', data.email);
        formData.append('contact', data.contact);
        if (profileImage) {
            formData.append('profile', profileImage);
        }  

        try {
            const res = await axiosMultipartInstance.post(`/editUserById/${id}`, formData);
            if (res.data.status === 200) {
                alert("Update Successfully");
            } else {
                alert("Failed");
            }
        } catch (err) {
            console.log(err);
            alert("An error occurred");
        }
    };

    return (
        <div>
            <div className='useredit-profile-nav fixed-top'>
                <div className='useredit-profile-navicon ms-5'>
                    <Link to='/user/user-profile' className='useredit-profile-color-link'><FaArrowLeft /></Link>
                    <span className='ms-3 useredit-profile-navedit'>Edit Profile</span>
                </div>
                <div className='text-center'>
                    <img src={profileImage ? URL.createObjectURL(profileImage) : `${BASE_URL}/${data.profile.filename}`} alt='Profile' className='useredit-profile-img' />
                    <label className='upload-icon'>
                        <RxPencil2 className='useredit-profile-icon' />
                        <input
                            type='file'
                            style={{ display: 'none' }}
                            name='profile'
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className='row container'>
                    <div className='col-5'></div>
                    <div className='col-4 container '>
                        <form onSubmit={handleSubmit}>
                            <label className='useredit-profile-label mt-1'>Name</label>
                            <input
                                type='text'
                                className='useredit-profile-textbox mt-2'
                                name='firstname'
                                onChange={handleChange}
                                value={data.firstname}
                            ></input>
                            <label className='mt-2 useredit-profile-label'>Gender</label>
                            <input
                                type='radio'
                                className='mt-4 ms-5'
                                name='gender'
                                value='Male'
                                checked={data.gender === 'Male'}
                                onChange={handleChange}
                            /> Male
                            <input
                                type='radio'
                                className='mt-4 ms-5'
                                name='gender'
                                value='Female'
                                checked={data.gender === 'Female'}
                                onChange={handleChange}
                            /> Female
                            <br></br>
                            <label className='useredit-profile-label mt-3'>Email</label>
                            <input
                                type='email'
                                className='useredit-profile-textbox mt-2'
                                name='email'
                                value={data.email}
                                onChange={handleChange}
                            ></input>
                            <label className='useredit-profile-label mt-3'>Phone number</label>
                            <input
                                type='text'
                                className='useredit-profile-textbox mt-2'
                                value={data.contact}
                                name='contact'
                                onChange={handleChange}
                            ></input>
                            <div className='text-center mt-3'>
                                <button type='submit' className='useredit-profile-updatebtn'>
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className='col-3'></div>
                </div>
            </div>
        </div>
    );
}

export default UserEditProfile;

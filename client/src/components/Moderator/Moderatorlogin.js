import React, { useState } from 'react'
import './Moderator.css'
import MainNav from '../homeComponents/Navbar/MainNav'
import Footer from '../Footer/Footer'
import moderatorlogin from '../../assets/images/moderatorlogin.png'
import { Link, useNavigate } from 'react-router-dom'

function Moderatorlogin() {

    const[data,setData]=useState({
        email:"",
        password:""
    })

    const[errors,setErrors]=useState({
        email:"",
        password:""
    })

    const[formIsValid,setFormIsValid]=useState(true);

    const navigate=useNavigate();

    const handleChange = (e) =>{
    const {name,value} = e.target;
    setData({
      ...data,[name]:value,
    });
        setErrors((prevErrors) => ({...prevErrors,[name]:""}));
    };

    const validateField = (fieldName, value) => {
    if (!value.trim()) {
        setFormIsValid(false);
        return `${fieldName} is required`;
    }
    return '';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let errors={};
        let formIsValid=true;

        errors.email = validateField('Email',data.email);
        if(errors.email) formIsValid = false;

        errors.password = validateField('Password',data.password)
        if(errors.password) formIsValid=false;

        setErrors(errors);
        setFormIsValid(formIsValid);
    }

  return (
    <div >
        <MainNav/>
      <div className='mt-5 container'>
        <div className='moderator-login-box mb-5'>
            <div className='row'>
                <div className='col'>
                    <img src={moderatorlogin} alt='img' className='moderator-login-img'></img>
                </div>
                <div className='col'>
                    <div className='text-center mt-5'>
                        <h2>Moderator Login</h2>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label className='moderator-login mt-5 ms-5'>Email</label>
                                <input  
                                className="moderator-login-textbox ms-5" 
                                type='email'
                                name='email'
                                value={data.email}
                                onChange={handleChange}
                                ></input>
                                {errors.email && <div className='user-login-error mt-2  text-danger'>{errors.email}</div>}
                            </div>
                            <div>
                                <label className='moderator-login mt-5 ms-5'>Password</label>
                                <input  
                                className="moderator-login-textbox ms-2" 
                                type='password'
                                name='password'
                                value={data.password}
                                onChange={handleChange}
                                ></input>
                                {errors.password && <div className='user-login-error mt-2 text-danger'>{errors.password}</div>}
                            </div>
                            <div className='mt-3 moderator-login-link container'>
                                <Link to="" className='moderator-login-forget'>Forget Password?</Link>
                            </div>
                                <button type='submit' className='moderator-login-btn mt-5' >Login</button>
                            <div className="mt-4 ms-5">
                                    <h6 className="text-center">
                                New to TradeHub?{" "}
                                    <Link to="/moderator/register" className="">
                                        Register Now
                                    </Link>
                                </h6>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Moderatorlogin

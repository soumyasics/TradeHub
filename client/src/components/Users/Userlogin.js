import React, { useState } from 'react'
import './User.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import adminlogin from '../../assets/images/adminlogin.png'
import { Link, useNavigate } from 'react-router-dom';
import MainNav from '../homeComponents/Navbar/MainNav';
import Footer from '../Footer/Footer';
import axiosInstance from '../../apis/axiosInstance';
function Userlogin() {

  const[data,setData]=useState({
    email:"",
    password:""
  });

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

  const handleSubmit = (e)=>{
    e.preventDefault();
    let errors = {};
    let formIsValid = true;

    errors.email = validateField('Email', data.email);
    if (errors.email) formIsValid = false;

    errors.password = validateField('Password', data.password);
    if (errors.password) formIsValid = false;

    setErrors(errors);
    setFormIsValid(formIsValid);
    
    if(formIsValid){
      axiosInstance.post('/loginUser',data)
      .then((res)=>{
        if(res.data.status === 200){
          console.log("Login Successfully",res);
          alert("Login Successfully")
          localStorage.setItem('userId',res.data.data._id)
          navigate('/user/home')
        }
        else{
          alert("Error")
          console.log("error");
        }
      })
      .catch((err)=>{
        console.log("Error",err);
        alert("Error")
      })
    }


  }

  return (   
    <div>
      <MainNav/>
      <div>
      <div className='container user-login-box'>
        <div className=' user-login-box1'>
            <Row>
              <Col className='container'>
                <img className="user-login-img mt-5" src={adminlogin} alt='img'></img>
              </Col>
              <Col>
                <h2 className='user-login-h2'>User Login</h2>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label className='user-login mt-5 ms-5'>Email</label>
                    <input  
                    className="user-login-textbox ms-5" 
                    type='email'
                    name='email'
                    value={data.email}
                    onChange={handleChange}
                    ></input>
                    {errors.email && <div className='user-login-error mt-2  text-danger'>{errors.email}</div>}
                  </div>
                  <div>
                    <label className='user-login mt-5 ms-5'>Password</label>
                    <input  
                    className="user-login-textbox ms-2" 
                    type='password'
                    name='password'
                    value={data.password}
                    onChange={handleChange}
                    ></input>
                    {errors.password && <div className='user-login-error mt-2 text-danger'>{errors.password}</div>}
                  </div>
                  <div className='mt-3'>
                    <Link to="/user/forgetpswd" className='user-login-forget'>Forget Password?</Link>
                  </div>
                    <button type='submit' className='user-login-btn mt-5' >Login</button>
                  <div className="mt-4 ms-5">
                        <h6 className="text-center">
                       New to TradeHub?{" "}
                        <Link to="/user/register" className="">
                            Register Now
                        </Link>
                    </h6>
                  </div>
                </form>
              </Col> 
            </Row>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  )
}

export default Userlogin

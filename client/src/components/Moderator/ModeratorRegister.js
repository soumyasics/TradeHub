import React, { useState } from 'react'
import './Moderator.css'
import MainNav from '../homeComponents/Navbar/MainNav'
import { BiImageAdd } from "react-icons/bi";
import { FiEdit2} from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';

function ModeratorRegister() {

    const[profileImage,setProfileImage]=useState(null);
    const Navigate=useNavigate();

    const[data,setData]=useState({
        firstname:"",
        lastname:"",
        email:"",
        contact:"",
        password:"",
        gender:"",
        profile:null,
        repassword:"",
        address:"",
        checkbox:false
    });

    const[errors,setErrors]=useState({
        firstname:"",
        lastname:"",
        email:"",
        contact:"",
        password:"",
        gender:"",
        profile:null,
        repassword:"",
        address:"",
        checkbox:false
    });

    let formIsValid=false
    
    const handleImageUpload = (e) => {
        setProfileImage(URL.createObjectURL(e.target.files[0]));
    };
    
    function validateField(fieldName,value){
        if (!value.trim()){
          return `${fieldName} is required`;
        }
        return '';
    }
      
    function validateImageField(files,value){
        if (!value){
          return `${files} is required.`;
        }
    }
    
      function validateContact(fieldName, value) {
        if (!value.trim()) {
          return `${fieldName} is required`;
        } else if (value.length !== 10) {
          return 'Please enter a valid Pincode';
        }
        return '';
      }
      function validateCheckbox(value){
        console.log(data.checkbox);
        if(!data.checkbox){
          return "You must agree to the terms and conditions."
          formIsValid = false;
        }
      }
    
      const handleFileChange = (e) => {
        handleChange(e);
        handleImageUpload(e);
      }

    const handleChangeChecked = (e) => {
        data.checkbox=e.target.checked
        console.log(e.target.checked);
        console.log(data);
        validateCheckbox(data)
    
    };
    const handleChange = (e) =>{
        const { name, value, files, type } = e.target;
        if (type === 'file') {
        const file = files[0];
        setData((prevData) => ({
            ...prevData,
            [name]: file,
        }));
        } else if (type === 'checkbox') {
        setData((prevData) => ({
            ...prevData,
            [name]: e.target.checked,
        }));
        } else {
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        }
      }
      console.log(data);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data);

        let errors={}
        let formIsValid=true;

        errors.firstname=validateField("Firstname",data.firstname)
        errors.lastname=validateField("Lastname",data.lastname)
        errors.email=validateField("Email",data.email)
        errors.contact=validateContact("Contact",data.contact)
        errors.address=validateField("Address",data.address)
        errors.profile=validateImageField("Profile",data.profile)
        errors.checkbox=validateCheckbox("Checkbox",data.checkbox)
       
        const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{6,}$/;
      if (!data.password.trim()) {
        formIsValid = false;
        errors.password = "Password is required";
      } else if (!passwordRegex.test(data.password)) { // Pass the password to the test method
        errors.password =
          "Password must contain at least one number, one special character, and one capital letter";
      }
    
      if (!data.repassword.trim()) {
        formIsValid = false;
        errors.repassword = "Confirm Password is required";
      } else if (data.repassword !== data.password) {
        formIsValid = false;
        errors.repassword = "Passwords do not match";
      }

      setErrors(errors);
      if(formIsValid){
        console.log('data',data);
      }
      for (let key in errors) {
        if (errors[key]) {
          formIsValid = false;
          break;
        }
      }
    }
  return (
    <div >
        <MainNav/>
      <div className='moderator-register-box container '>
        
            <div className='mb-5 ' >
              <form onSubmit={handleSubmit}>
                <div className='row'>
                  <div className='col container '>
                    <div>
                      <label className='moderator-register-label mt-3'>Name</label>
                      <input type='text'
                      placeholder='First Name' 
                      className='moderator-register-textbox mt-2'
                      value={data.firstname}
                      name='firstname'
                      onChange={handleChange}
                      ></input>
                      {errors.firstname && <span className='text-danger'>{errors.firstname}</span>}
                      <input type='text' 
                      placeholder='Last Name' 
                      className='moderator-register-textbox mt-5'
                      value={data.lastname}
                      name='lastname'
                      onChange={handleChange}
                      ></input>
                      {errors.lastname && <span className='text-danger'>{errors.lastname}</span>}
                    </div>
                    <label className='moderator-register-label mt-5'>Gender</label>
                    <input type='radio' className='ms-5 moderator-register-radio'  name='gender' onChange={handleChange} checked={data.gender === "male"} ></input><label className='user-register-label ms-2'>Male</label>
                    <input type='radio' className='ms-5 moderator-register-radio'  name='gender' onChange={handleChange} checked={data.gender === "female"}  ></input><label className='user-register-label ms-2'>Female</label><br></br>
                    <div>
                      <label className='moderator-register-label mt-4'>Email</label>
                      <input type='email' 
                      placeholder='Email'  
                      className='user-register-textbox mt-2'
                      value={data.email}
                      name='email'
                      onChange={handleChange}
                      ></input>
                      {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div>
                      <label className='moderator-register-label mt-4'>Phone number</label>
                      <input type='text' 
                      placeholder='Phone number' 
                      className='moderator-register-textbox mt-2'
                      value={data.contact}
                      name='contact'
                      onChange={handleChange}
                      ></input>
                      {errors.contact && <span className='text-danger'>{errors.contact}</span>}
                    </div>
                    <div class="form-check">
                        <input class="form-check-input mt-5" 
                        type="checkbox" 
                        value={data.checkbox} 
                        name='checkbox'
                        onChange={handleChangeChecked}
                        id="flexCheckChecked"  />
                        <label class="form-check-label mt-5 label-moderator-register" for="flexCheckChecked">
                          Agree to Terms and Condition
                        </label><br></br>
                        {errors.checkbox && <span className='text-danger'>{errors.checkbox}</span>}
                      </div>
                    
                  </div>
                  <div className='col'>
                    <div className='moderator-register-icon'>
                          {profileImage ? (
                        <img src={profileImage} alt="profile" className="rounded-circle" width="200" height="200" />
                      ) : (
                        <BiImageAdd size={190} color='grey' className='rounded-circle p-3'
                        />
                      )}
                      <label className='upload-icon'>
                      <FiEdit2 className='' color='grey'/>
                        <input 
                        type='file'
                        style={{display:'none'}}
                        name='profile'
                        onChange={handleFileChange}
                        className={errors.profile ? 'is-valid' : ''}
                        />
                        {errors.profile && <span className='text-danger'>{errors.profile}</span>}
                        </label>
                    </div>
                    <div>
                    <label className='moderator-register-label mt-3'>Password</label>
                      <input type='password'
                      placeholder='Password' 
                      className='moderator-register-textbox mt-2'
                      value={data.password}
                      name='password'
                      onChange={handleChange}
                      ></input>
                      {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <div>
                      <label className='moderator-register-label mt-4'>Re-enter Password</label>
                      <input type='password'
                      placeholder='Re-enter Password' 
                      className='moderator-register-textbox mt-2'
                      value={data.repassword}
                      name='repassword'
                      onChange={handleChange}
                      ></input>
                      {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div> 
                    <div>
                        <label className='moderator-register-label mt-4'>Address</label>
                        <input type='text'
                        placeholder='Address'
                        className='moderator-register-textbox1 mt-2'
                        name='address'
                        value={data.address}
                        onChange={handleChange}
                        />
                        {errors.address && <span className='text-danger'>{errors.address}</span>}
                    </div>
                  </div>
                     
                      
                  <div className='text-center'>
                    <button type='submit' className='moderator-register-btn mt-4'>Register</button>
                  </div>
                  <div className='text-center mt-3'>
                    <label>Are you Existing User?</label><Link className='moderator-register-link'><span> Login Now</span></Link>
                  </div>
                </div>
              </form>
            </div>
        </div>
     <Footer/>
    </div>
  )
}

export default ModeratorRegister

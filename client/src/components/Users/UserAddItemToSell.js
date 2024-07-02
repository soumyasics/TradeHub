import React, { useState } from 'react'
import './User.css'
import UserMainNav from './UserMainNav'
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { FiEdit2} from "react-icons/fi";
import { BiImageAdd } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import dp from '../../assets/images/dp.jpg'
import Footer from '../Footer/Footer';

function UserAddItemToSell() {

  const[profileImage,setProfileImage]=useState(null);
  const[count,setCount]=useState(1)
  const Navigate=useNavigate();

  const increment = () =>{
    setCount(count+1)
    console.log(count);
  }
  const decrement = () =>{
    setCount(count-1)
    console.log(count);
  }

  const [data,setData]=useState({
    category:"",
    image:null,
    item:"",
    itemdescription:"",
    address:"",
    pincode:"",
    district:"",
    location:""
  })

  const[errors,setErrors]=useState({
    category:"",
    image:null,
    item:"",
    itemdescription:"",
    address:"",
    pincode:"",
    district:"",
    location:""
  })
  let formIsValid=false

  const handleChange = (e) =>{
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  }
  console.log(data);

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

  function validatePincode(fieldName, value) {
    if (!value.trim()) {
      return `${fieldName} is required`;
    } else if (value.length !== 6) {
      return 'Please enter a valid Pincode';
    }
    return '';
  }

  const handleFileChange = (e) => {
    handleChange(e);
    handleImageUpload(e);
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    console.log(data);

    let errors={};
    let formIsValid=true;

    errors.category=validateField("Category",data.category)
    errors.image=validateImageField("Image",data.image)
    errors.item=validateField("Item",data.item)
    errors.itemdescription=validateField("ItemDescription",data.itemdescription)
    errors.address=validateField("Address",data.address)
    errors.pincode=validatePincode("Pincode",data.pincode)
    errors.district=validateField("District",data.district)
    errors.location=validateField("Location",data.location)
    setErrors(errors);
console.log(errors);
for (let key in errors) {
  if (errors[key]) {
    formIsValid = false;
    break;
  }    
}
  }

  return (
    <div>
        <UserMainNav/>
      <div className='mb-5'>
        <div className='ms-5 mt-5'>
        <Link to='/user/home' className='useradd-itemtosell-color-link'><FaArrowLeft /></Link>
        </div>
        <div className='text-center useradd-itemtosell-div'>
            ADD ITEM TO SELL
        </div>
        <div className='useradd-itemtosell-box container mt-4'>
            <form  onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='col mt-5 ' style={{position:'relative'}}>
                      <div className='text-center text-dark'>
                        <label className='useradd-itemtosell-label'>Category</label>
                        
                        <select className='ms-5 useradd-itemtosell-select'
                        name='category'
                        value={data.category}
                        onChange={handleChange}>
                          <option>Select</option>
                          <option>Books</option>
                          <option>Electronics</option>
                          <option>Jewellery</option>
                          <option>Home Appliances</option>
                          <option>Clothing</option>
                          <option>Beauty</option>
                          
                        </select>
                       
                      </div>
                      {errors.category && <span className='text-danger text-center'>{errors.category}</span>}
                      <div className='container mt-5 ms-4 ps-4'>
                        <label className='ms-5 useradd-itemtosell-label'>Condition</label>
                        <input type='radio' className='ms-5 ps-2' name='condition'/> Flawless
                        
                        <div className='container ms-5 ps-5'>
                          <label className='ms-5  useradd-itemtosell-label'></label>
                          <input type='radio' className=' mt-3 useradd-itemtosell-radio' name='condition'/> No Damage
                        </div>
                        <div className='container ms-5 ps-5'>
                        <label className='ms-5 useradd-itemtosell-label'></label>
                          <input type='radio' className='useradd-itemtosell-radio mt-3' name='condition'/> Minor Scratches
                        </div>
                       
                      </div>
                      <div className='container mt-4 ms-4 ps-4 '>
                        <label className='useradd-itemtosell-label ms-5'>Quantity</label>
                        <button className='ms-5 useradd-itemtosell-quantitybtn' onClick={decrement}>-</button>
                        <span className='ms-3 useradd-itemtosell-quantity-span'>{count}</span>
                        <button className='ms-3 useradd-itemtosell-quantitybtn' onClick={increment}>+</button>
                      </div>
                      <div className='container mt-2 ms-4 ps-4' >
                        <label className='useradd-itemtosell-label ms-5'>Upload Image</label>
                        {profileImage ? (
                        <img src={profileImage} alt="profile" className="rounded-circle" width="200" height="200" />
                      ) : (
                        <BiImageAdd size={90} color='grey' className='rounded-circle p-3'
                        />
                      )}
                      <label className='upload-icon'>
                      <FaPlus className='useradd-itemtosell-uploadicon' color='grey'/>
                        <input 
                        type='file'
                        style={{display:'none'}}
                        name='image'
                        value={data.image}
                        onChange={handleFileChange}
                        />
                        </label>
                        {errors.image && <span className='text-danger'>{errors.image}</span>}
                        {profileImage ? (
                        <img src={profileImage} alt="profile" className="rounded-circle" width="200" height="200" />
                      ) : (
                        <BiImageAdd size={90} color='grey' className='rounded-circle p-3'
                        />
                      )}
                      <label className='upload-icon'>
                      <FaPlus className='useradd-itemtosell-uploadicon' color='grey'/>
                        <input 
                        type='file'
                        style={{display:'none'}}
                        name='image'
                        />
                        </label>
                        {profileImage ? (
                        <img src={profileImage} alt="profile" className="rounded-circle" width="200" height="200" />
                      ) : (
                        <BiImageAdd size={90} color='grey' className='rounded-circle p-3'
                        />
                      )}
                      <label className='upload-icon'>
                      <FaPlus className='useradd-itemtosell-uploadicon' color='grey'/>
                        <input 
                        type='file'
                        style={{display:'none'}}
                        name='image'
                        />
                        </label>    
                      </div>
                      <div className='useradd-itemtosell-uploadimg'>
                      {profileImage ? (
                        <img src={profileImage} alt="profile" className="rounded-circle" width="200" height="200" />
                      ) : (
                        <BiImageAdd size={90} color='grey' className='rounded-circle p-3'
                        />
                      )}
                      <label className='upload-icon'>
                      <FaPlus className='useradd-itemtosell-uploadicon' color='grey'/>
                        <input 
                        type='file'
                        style={{display:'none'}}
                        name='image'
                        />                       
                        </label>
                        {profileImage ? (
                        <img src={profileImage} alt="profile" className="rounded-circle" width="200" height="200" />
                      ) : (
                        <BiImageAdd size={90} color='grey' className='rounded-circle p-3'
                        />
                      )}
                      <label className='upload-icon'>
                      <FaPlus className='useradd-itemtosell-uploadicon' color='grey'/>
                        <input 
                        type='file'
                        style={{display:'none'}}
                        name='image'
                        />                       
                        </label>
                        {profileImage ? (
                        <img src={profileImage} alt="profile" className="rounded-circle" width="200" height="200" />
                      ) : (
                        <BiImageAdd size={90} color='grey' className='rounded-circle p-3'
                        />
                      )}
                      <label className='upload-icon'>
                      <FaPlus className='useradd-itemtosell-uploadicon' color='grey'/>
                        <input 
                        type='file'
                        style={{display:'none'}}
                        name='image'
                        />                        
                        </label>
                      </div>
                      <div className='container mt-2 ms-4 ps-4 '>
                        <label className='useradd-itemtosell-label ms-5'>Review Details:</label>
                      </div>
                      <div className='mt-4 ms-5 ps-4'>
                        <div className='row'>
                          <div className='col-6'>
                            <img src={dp} className='useradd-itemtosell-reviewimg'></img>
                          </div>
                          <div className='col-6'>
                          <label className="container text-dark">
                            Name
                          </label>{" "}
                          <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            className="useradd-itemtosell-textbox1"
                            />
                            <label className="container text-dark mt-3">
                            Phone number
                          </label>{" "}
                          <input
                            type="text"
                            placeholder="Phone number"
                            name="name"
                            className="useradd-itemtosell-textbox1"
                            />                         
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col'>
                      <div className='row container'>
                        <div className='col-5'>
                          <div className='container mt-5 ms-4 ps-4'>
                            <label className='useradd-itemtosell-label ms-5'>Item</label>
                          </div>
                          <div  className='container mt-5 ms-4 ps-4'>
                          <label className='useradd-itemtosell-label ms-5'>Item Description</label>
                          </div>
                          <div className='container mt-5 ms-4 ps-4 pt-5'>
                            <label className='useradd-itemtosell-label ms-5'>Address</label>
                          </div>
                          <div className='container mt-5 ms-4 ps-4 pt-5'>
                            <label className='useradd-itemtosell-pinlabel ms-5'>Pincode</label>
                          </div>
                          <div className='container mt-5 ms-4 ps-4'>
                            <label className='useradd-itemtosell-label ms-5'>District</label>
                          </div>
                          <div className='container mt-5 ms-4 ps-4 pt-4'>
                            <label className='useradd-itemtosell-label ms-5'>Location</label>
                          </div>
                        </div>
                        <div className='col-7'>
                          <div className='container mt-5  '>
                              <input type='text' 
                              className='ms-5  useradd-itemtosell-textbox'
                              placeholder='Item'
                              name='item'
                              // value={data.item}
                              onChange={handleChange}/>
                              {errors.item && <span className='text-danger'>{errors.item}</span>}                       
                            </div>
                            <div className='container mt-4 ms-4 ps-4'>
                              <input type='text' 
                              className='ms-3 useradd-itemtosell-itemtextbox'
                              placeholder='Item Description'
                              name='itemdescription'
                              value={data.itemdescription}
                              onChange={handleChange}/>
                              {errors.itemdescription && <span  className='text-danger'>{errors.itemdescription}</span>}
                            </div>
                            <div className='container mt-4 ms-4 ps-4'>
                              <input type='text' 
                              className='ms-3 useradd-itemtosell-itemtextbox'
                              placeholder='Address'
                              name='address'
                              value={data.address}
                              onChange={handleChange}/>
                              {errors.address && <span  className='text-danger text-center'>{errors.address}</span>}
                            </div>
                            <div className='container mt-5  '>
                              <input type='text' 
                              className='ms-5  useradd-itemtosell-textbox'
                              placeholder='Pincode'
                              name='pincode'
                              value={data.pincode}
                              onChange={handleChange}/>
                              {errors.pincode && <span  className='text-danger text-center'>{errors.pincode}</span>}                       
                            </div>
                            <div className='container mt-5  '>
                              <input type='text' 
                              className='ms-5  useradd-itemtosell-textbox'
                              placeholder='District'
                              name='district'
                              value={data.district}
                              onChange={handleChange}/>
                              {errors.district && <span  className='text-danger'>{errors.district}</span>}                      
                            </div>
                            <div className='container mt-5  '>
                              <input type='text' 
                              className='ms-5  useradd-itemtosell-textbox'
                              placeholder='Location'
                              name='location'
                              value={data.location}
                              onChange={handleChange}/>
                              {errors.location && <span  className='text-danger'>{errors.location}</span>}                    
                            </div>
                        </div>
                      </div>
                      <div className='text-center mt-5'>
                        <button className='useradd-itemtosell-postbtn' type="submit">Post Now</button>
                      </div>
                      
                    </div>
                </div>
            </form>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default UserAddItemToSell

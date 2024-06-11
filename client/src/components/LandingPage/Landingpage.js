import React from 'react'
import './Landingpage.css'
import Navbar from 'react-bootstrap/Navbar';
import Nav from "react-bootstrap/Nav";
import logo from '../../assets/images/logo.png'
import { Link } from 'react-router-dom';
import landingpage from '../../assets/images/landingpage.png'
function Landingpage() {
  return (
    <div className='landing-page-color'>
      <div className='row'>
        <div className='col-5'>
            <img className='landingpage-img container' src={landingpage} alt='img'></img>
        </div>
        <div className='col-7'>
            <p className='landing-page-para'>
                Explore a dynamic<br></br>
                exchange platsform
            </p>
            <p className='landing-page-para1'>Where perference meets needs, brought right your door</p>
            <div>
            <button type='button' className='landing-page-button'>Explore Now</button>
        </div>
        </div>
       
      </div>
    </div>
    
  )
}

export default Landingpage

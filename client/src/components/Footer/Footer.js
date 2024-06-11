import React from 'react'
import './Footer.css'
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
function Footer() {
  return (
    <div>
      <div className='footer-page'>
        <div className='container'>
            <div className='row'>
                <div className='col-3'>
                </div>
                <div className='col-5'>
                  <div className=' mt-5 '>
                    <span className='footer-page-span ms-5'>Legal</span>
                    <span className='footer-page-span ms-5'>Terms of use</span>
                    <span className='footer-page-span ms-5'>privacy policy</span>   
                  </div>   
                </div>
                <div className='col-4'>
                    <span><FaFacebookSquare className='footer-icon mt-5'/></span>{"  "}
                    <span><FaTwitter className='footer-icon mt-5 ms-2' /></span>{"  "}
                    <span><FaInstagram className='footer-icon mt-5 ms-2'/></span>{"  "}
                    <span><FaPinterest className='footer-icon mt-5 ms-2'/></span> {"  "}
                </div>               
            </div>
            <div className='container'>
              <h6 className='footer-page-h6 mt-5'>TradeHub and the TradeHub logo are trademarks of xyz coporation,registered in the U.S and other countries.</h6>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Footer

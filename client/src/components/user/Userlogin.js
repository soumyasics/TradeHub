import React from 'react'
import './User.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import adminlogin from '../../assets/images/adminlogin.png'
import { Link } from 'react-router-dom';
import MainNav from '../homeComponents/Navbar/MainNav';
import Footer from '../Footer/Footer';
function Userlogin() {
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
                <form>
                  <div>
                    <label className='user-login mt-5 ms-5'>Email</label>
                    <input  
                    className="user-login-textbox ms-5" 
                    type='email'
                    name='email'
                    // value={data.email}
                    // onChange={handleChange}
                    ></input>
                    {/* {errors.email && <div className='container ms-5 text-danger'>{errors.email}</div>} */}
                  </div>
                  <div>
                    <label className='user-login mt-5 ms-5'>Password</label>
                    <input  
                    className="user-login-textbox ms-2" 
                    type='password'
                    name='password'
                    // value={data.password}
                    // onChange={handleChange}
                    ></input>
                    {/* {errors.password && <div className='container me-1 text-danger'>{errors.password}</div>} */}
                  </div>
                  <div className='mt-3'>
                    <Link to="/user/forgetpswd" className='user-login-forget'>Forget Password?</Link>
                  </div>
                  <button type='submit' className='admin-login-btn mt-5' >Login</button>
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

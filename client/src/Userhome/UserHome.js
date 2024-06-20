import React from 'react'
import MainNav from '../components/homeComponents/Navbar/MainNav'
import Landingpage from '../components/LandingPage/Landingpage'
import HomeCategories from './HomeCategories'
import Footer from '../components/Footer/Footer'

function UserHome() {
  return (
    <div>
      <div>
        <Landingpage/>
        <HomeCategories/>
        <Footer/>
      </div>
    </div>
  )
}

export default UserHome

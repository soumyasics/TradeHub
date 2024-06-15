import React from 'react'
import './Userhome.css'
import electronics from '../assets/images/electronics.png'
import books from '../assets/images/books.png'
import homeappliances from '../assets/images/homeappliances.png'
import cloths from '../assets/images/cloths.png'
import jewels from '../assets/images/jewels.png'
import furniture from '../assets/images/furniture.png'
function HomeCategories() {
  return (
    <div>
      <div className='container'>
        <h3 className='mt-5 '>Categories</h3>
        <div className='row'>
            <div className='col container'>
                <img className='home-category-electronics mt-3' src={electronics} alt='img'></img>
            </div>  
            <div className='col'>
                <img className='home-category-electronics mt-3' src={books} alt='img'></img>
            </div> 
            <div className='col'>
              <img className='home-category-electronics mt-3' src={jewels} alt='img'></img>
            </div> 
            <div className='col'>
                <img className='home-category-electronics mt-3' src={homeappliances} alt='img'></img>
            </div> 
            <div className='col'>
                <img className='home-category-electronics mt-3' src={cloths} alt='img'></img>
            </div> 
            <div className='col'>
              <img className='home-category-electronics mt-3' src={furniture} alt='img'></img>
            </div> 
        </div>
      </div>
    </div>
  )
}

export default HomeCategories

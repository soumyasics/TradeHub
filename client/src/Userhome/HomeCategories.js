import React from 'react'
import './Userhome.css'
import electronics from '../assets/images/electronics.png'
import books from '../assets/images/books.png'
import homeappliances from '../assets/images/homeappliances.png'
import cloths from '../assets/images/cloths.png'
import jewels from '../assets/images/jewels.png'
import furniture from '../assets/images/furniture.png'
import { useNavigate } from 'react-router-dom'
import { MdOutlinePermMedia } from 'react-icons/md'
function HomeCategories() {
  
  const navigate = useNavigate();
  function openCategoryPage(category) {
    navigate(`/view-category/${category}`)
  }
  
  return (
    <div>
      <div className='container'>
        <h3 className='mt-5 '>Categories</h3>
        <div className='row'>
            <div className='col container' onClick={() => {
              openCategoryPage('Electronics')
            }}>
                <img className='home-category-electronics mt-3' src={electronics} alt='img'></img>
            </div>  
            <div className='col' onClick={()=>{
              openCategoryPage('Books')
            }}>
                <img className='home-category-electronics mt-3' src={books} alt='img'></img>
            </div> 
            <div className='col'
            onClick={()=>{
              openCategoryPage('Jewellery')
            }}>
              <img className='home-category-electronics mt-3' src={jewels} alt='img'></img>
            </div> 
            <div className='col'
            onClick={()=>{
              openCategoryPage('HomeAppliances')
            }}>
                <img className='home-category-electronics mt-3' src={homeappliances} alt='img'></img>
            </div> 
            <div className='col'
            onClick={()=>{
              openCategoryPage('Clothing')
            }}>
                <img className='home-category-electronics mt-3' src={cloths} alt='img'></img>
            </div> 
            <div className='col' 
            onClick={()=>{
              openCategoryPage('Furniture')
            }}>
              <img className='home-category-electronics mt-3' src={furniture} alt='img'></img>
            </div> 
            <div className='userhome-category'>

            </div>
        </div>
      </div>
    </div>
  )
}

export default HomeCategories

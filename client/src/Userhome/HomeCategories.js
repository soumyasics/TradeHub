import React from "react";
import "./Userhome.css";
import electronics from "../assets/images/electronics.png";
import books from "../assets/images/books.png";
import homeappliances from "../assets/images/homeappliances.png";
import cloths from "../assets/images/cloths.png";
import jewels from "../assets/images/jewels.png";
import furniture from "../assets/images/furniture.png";
import { useNavigate } from "react-router-dom";
import { MdOutlinePermMedia } from "react-icons/md";
function HomeCategories() {
  const navigate = useNavigate();
  function openCategoryPage(category) {
    navigate(`/view-category/${category}`);
  }

  return (
    <div>
      <div className="container">
        <h3 className="mt-5 ">Categories</h3>
        <div className="row">
          <div
            className="col container  home-category-electronics-box"
            onClick={() => {
              openCategoryPage("Electronics");
            }}
          >
            <img
              className="home-category-electronics mt-3"
              src={electronics}
              alt="img"
            ></img>
            <div className="home-catogory-hover-box">
              <h3>Electronics </h3>
            </div>
          </div>
          <div
            className="col home-category-electronics-box"
            onClick={() => {
              openCategoryPage("Books");
            }}
          >
            <img
              className="home-category-electronics mt-3"
              src={books}
              alt="img"
            ></img>
            <h3>Books</h3>
          </div>
          <div
            className="col home-category-electronics-box"
            onClick={() => {
              openCategoryPage("Jewellery");
            }}
          >
            <img
              className="home-category-electronics mt-3"
              src={jewels}
              alt="img"
            ></img>
            <h3>Jewellery</h3>
          </div>
          <div
            className="col home-category-electronics-box"
            onClick={() => {
              openCategoryPage("Home Appliances");
            }}
          >
            <img
              className="home-category-electronics mt-3"
              src={homeappliances}
              alt="img"
            ></img>
            <h3>Home Appliances</h3>
          </div>
          <div
            className="col home-category-electronics-box"
            onClick={() => {
              openCategoryPage("Clothing");
            }}
          >
            <img
              className="home-category-electronics mt-3"
              src={cloths}
              alt="img"
            ></img>
            <h3>Clothing</h3>
          </div>
          <div
            className="col home-category-electronics-box"
            onClick={() => {
              openCategoryPage("Furniture");
            }}
          >
            <img
              className="home-category-electronics mt-3"
              src={furniture}
              alt="img"
            ></img>
            <h3>Furniture</h3>
          </div>
          <div className="userhome-category"></div>
        </div>
      </div>
    </div>
  );
}

export default HomeCategories;

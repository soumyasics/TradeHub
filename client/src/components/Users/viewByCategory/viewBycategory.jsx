import "./viewByCategory.css";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import img2 from "../../../assets/images/itemDetailsPoints.png";
import img1 from "../../../assets/images/productCardImage.png";
import { useParams } from "react-router-dom";
import { useEffect } from "react";


export const  ViewByCategory= () => {
  const {category} = useParams()
  useEffect(()=>
  {
    if(!category)  {
getItemsBYcategory()
    }
  },[])
  return (
    <div>
      <div className="productCard-body">
        <h5 className="user-wishlist-heading2">category</h5>
        <div class="container text-center">
          <div class="row row-cols-4 gap-5 d-flex my-5">
         
            <div className="card productCard-box2" style={{ width: "18rem" }}>
              <img src={"https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg"} className="card-img-top w-100 h-50" alt="..." />

              <div className="d-flex" style={{ height: "120px" }}>
                <div className="wishlist-heart-icon">
                  <CiHeart className="category-wish-list-heart" />
                </div>

                <div className="wishlist-heart-icon">
                  <FaHeart className="user-wishlist-fill-heart" />
                </div>

                <div className="card-body ">
                  <h5 className="card-text"> </h5>
                  <p className="card-text"></p>
                </div>
                <div className="productCard-points-box d-flex ">
                  <img src={img2} alt="coin" />
                  <p></p>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <button className="productCard-button2">
                  Exchange Now <FaChevronRight />
                </button>
              </div>
            </div>
            
          </div>
          <div className="user-view-more-btn">
            <button>View More </button>
          </div>
        </div>
      </div>
    </div>
  );
};

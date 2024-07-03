import "./itemDetails.css";
import { FaArrowLeft } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

import img1 from "../../../assets/images/itemDetails_image1.png";
import img2 from "../../../assets/images/itemDetailsPoints.png";
import { useState } from "react";
export const ItemDetails = () => {
  const [wishList, setWhishList] = useState(false);
  let productDetails = {
    productType: "Electonics",
    productName: "Airpods",
    quantity: 1,
    condition: "No Damage",
    description:
      "Airpods with 35 hrs Playback,13mm Drivess, bluetooth headset. ",
    Adress: " kazhakootam,trivandrum, kerala,695022.",
    Location: " kazhakootam.",
    points: 100,
  
  };
  const clickWishList = () =>
    {
       setWhishList(!wishList)
    }
  return (
    <div className="itemDeails-body">
      <div class="container text-center">
        <div class="row">
          <div class="col-md-6 d-flex itemDetails-left-box">
            <FaArrowLeft className="itemDetails-left-arrow" />

            <div>
              <img
                src={img1}
                alt=""
                className="img-fluid itemdetails-view-product-image"
              />
              <div className="itemDetails-coins-box d-flex">
                <img src={img2} alt="" className="itemDetails-points-image" />
                <p> {productDetails.points}</p>

              </div>
              <FaRegHeart className="itemdetails-heart" onClick={clickWishList}/>
              {wishList&&<FaHeart className="itemdetails-heart" onClick={clickWishList} />}
            </div>
          </div>
          <div class="col-md-6 itemDetails-right-box">
            <h3>{productDetails.productType}</h3>
            <h1>{productDetails.productName}</h1>
            <div class="container ">
              <div class="row itemDetails-right-inner-box">
                <div class="col-6">
                  <h6>Quantity</h6>
                  <div className="itemDetails-quantity">
                    {productDetails.quantity}
                  </div>
                  <div></div>
                </div>
                <div class="col-6">
                  <h6>Condition</h6>
                  <p>{productDetails.condition}</p>
                </div>
              </div>
              <table>
                <tr>
                  <th>Description</th>
                  <td>:</td>
                  <td>{productDetails.description}</td>
                </tr>
                <tr>
                  <th>Adress</th>
                  <td>:</td>
                  <td>{productDetails.Adress}</td>
                </tr>
                <tr>
                  <th>Location</th>
                  <td>:</td>
                  <td>{productDetails.Location}</td>
                </tr>
              </table>
              <div className="itemDetails-button-box">
                <button>Exchange Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

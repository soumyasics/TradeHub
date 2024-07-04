import "./productCard.css";
import { FaChevronRight } from "react-icons/fa";
import img1 from "../../../assets/images/productCardImage.png";
import img2 from "../../../assets/images/itemDetailsPoints.png";
export const ProductCard = () => {
  let cardDetails = [
    {
      image: img1,
      name: "Airpode Pro",
      description: "Brand New Airpode pro",
      points: 100,
    },
    {
      image: img1,
      name: "Airpode Pro",
      description: "Brand New Airpode pro",
      points: 100,
    },
    {
      image: img1,
      name: "Airpode Pro",
      description: "Brand New Airpode pro",
      points: 100,
    },
    {
      image: img1,
      name: "Airpode Pro",
      description: "Brand New Airpode pro",
      points: 100,
    },
    {
      image: img1,
      name: "Airpode Pro",
      description: "Brand New Airpode pro",
      points: 100,
    },
  ];
  return (
    <div className="productCard-body">
      <h3 className="product-card-heading">New Arrivals</h3>
      <div class="container text-center">
        <div class="row row-cols-4">
          {cardDetails.map((e) => {
            return (
              <div>
                <div
                  className="card productCard-box"
                  style={{ width: "18rem" }}
                >
                  <img src={e.image} className="card-img-top" alt="..." />
                  <div className="d-flex">
                 
                  <div className="card-body ">
                    <p className="card-text">{e.name} </p>
                    <h5 className="card-title">Description</h5>
                    <p className="card-text">{e.description}</p>
                    </div>
                    <div className="productCard-points-box d-flex ">
                    <img src={img2} alt="" />
                    <p>{e.points}</p>
                  </div>
                    </div>
                    <button className="productCard-button">
                      Exchange Now <FaChevronRight />
                    </button>
                  
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
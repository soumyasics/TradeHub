import "./productRequest.css";
import ModeratorSidebar from "../moderatorSidebar/moderatorSidebar";
import productImg from "../../../assets/images/productImg.jpeg";
function ProductRequest() {
  const data = [
    {
      productname: "Airpod",
      category: "Electronics",
      description:
        "Airpods with 35 hrs Playback,13mm Drivess, bluetooth headset",
      condition: "Minor Scratches",
    },
    {
      productname: "Airpod",
      category: "Electronics",
      description:
        "Airpods with 35 hrs Playback,13mm Drivess, bluetooth headset",
      condition: "Minor Scratches",
    },
    {
      productname: "Airpod",
      category: "Electronics",
      description:
        "Airpods with 35 hrs Playback,13mm Drivess, bluetooth headset",
      condition: "Minor Scratches",
    },
    {
      productname: "Airpod",
      category: "Electronics",
      description:
        "Airpods with 35 hrs Playback,13mm Drivess, bluetooth headset",
      condition: "Minor Scratches",
    }
  ];
  return (
    <div>
      <div className="productrequest-main">
        <div className="productrequest-head">
          <h2>Product Request</h2>
        </div>
        <div className="container">
          <div className="row">
            {data.map((e) => {
              return (
                <div className="productrequest-box col-md-5 mt-3   ">
                  <div className="productImg">
                    <img src={productImg} alt="" />
                  </div>
                  <div className="productDetails">
                    <table>
                      <tr>
                        <td>Item name</td>
                        <td>:</td>
                        <td>{e.productname}</td>
                      </tr>
                      <tr>
                        <td>Category</td>
                        <td>:</td>
                        <td>{e.category}</td>
                      </tr>
                      <tr>
                        <td>Description</td>
                        <td>:</td>
                        <td>{e.description}</td>
                      </tr>
                      <tr>
                        <td>Conditon</td>
                        <td>:</td>
                        <td>{e.condition}</td>
                      </tr>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductRequest;

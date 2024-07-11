import "./myDelivery.css";
import pic from "../../../assets/images/viewItemsImage.png";
import { CiDeliveryTruck } from "react-icons/ci";
export const MyDelivery = () => {
  let myItems = [
    {
      itemname: "Airpods",
      customerName: "shaju",
      phoneNumber: "1234567890",
      condition: "no damage",
    },
    {
      itemname: "Airpods",
      customerName: "shaju",
      phoneNumber: "1234567890",
      condition: "no damage",
    },
    {
      itemname: "Airpods",
      customerName: "shaju",
      phoneNumber: "1234567890",
      condition: "no damage",
    },
    {
      itemname: "Airpods",
      customerName: "shaju",
      phoneNumber: "1234567890",
      condition: "no damage",
    },
  ];

  console.log("my ites", myItems);
  return (
    <div>
      <h1 className="mydeliveries-viewItems-heading text-center">
        My deliveries
      </h1>
      
      <div className=" w-100 " style={{height: "600px", overflow: "scroll"}}>
      {myItems.map((e, index) => {
        return (
          <div key={index}>
            <div className="user-viewItems-body2">
              <div>
                <div className="user_viewItems-box">
                  <div class="container text-center">
                    <div class="row">
                      <div class="col-4 mydelivrey-viewItems-left-box">
                        <img style={{ width: "50%" }} src={pic} alt="Item" />
                      </div>
                      <div class="col-6 mydelivrey-viewItems-middle-box">
                        <table>
                          <thead>
                            <tr>
                              <td>Items name</td>
                              <td>:</td>
                              <td className="user-view_Items-data">
                                {e.itemname}
                              </td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Customer name</td>
                              <td>:</td>
                              <td className="user-view_Items-data">
                                {e.customerName}{" "}
                              </td>
                            </tr>
                            <tr>
                              <td>Phone number</td>
                              <td>:</td>
                              <td className="user-view_Items-data">
                                {e.phoneNumber}
                              </td>
                            </tr>
                            <tr>
                              <td>Condition</td>
                              <td>:</td>
                              <td className="user-view_Items-data">
                                {e.condition}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="col-2 user-viewItems-right-box">
                        <div className="myDelivery-Delivered-box d-flex">
                          <p>Delivered</p>
                          <CiDeliveryTruck className="mydelivery-delivered-icon" />
                        </div>
                        <div style={{ cursor: "pointer" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
        </div>
    </div>
  );
};

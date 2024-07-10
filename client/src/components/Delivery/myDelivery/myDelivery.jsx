import "./myDelivery.css";
import pic from "../../../assets/images/viewItemsImage.png";
export const MyDelivery = () => {
  let myItems = {
    itemname: "Airpods",
    customerName: "shaju",
    phoneNumber: "1234567890",
    condition: "no damage",
  };
  return (
    <div>
      <div className="user-viewItems-body">
        <h1 className="user-viewItems-heading text-center">My items</h1>
        <div>
          <div className="user_viewItems-box">
            <div class="container text-center">
              <div class="row">
                <div class="col-4 user-viewItems-left-box">
                  <img style={{ width: "50%" }} src={pic} alt="Item" />
                </div>
                <div class="col-6 user-viewItems-middle-box">
                  <table>
                    <thead>
                      <tr>
                        <td>Items name</td>
                        <td>:</td>
                        <td className="user-view_Items-data">fggf</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Category</td>
                        <td>:</td>
                        <td className="user-view_Items-data">sdsf </td>
                      </tr>
                      <tr>
                        <td>Item description</td>
                        <td>:</td>
                        <td className="user-view_Items-data">dnfd </td>
                      </tr>
                      <tr>
                        <td>Item quantity</td>
                        <td>:</td>
                        <td className="user-view_Items-data">ddf </td>
                      </tr>
                      <tr>
                        <td> Location</td>
                        <td>:</td>
                        <td className="user-view_Items-data">dfdf </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="col-2 user-viewItems-right-box">
                  <div className="userView-right-inner-box">
                    <div className="userItemView-pending bg-danger"></div>
                  </div>
                  <div style={{ cursor: "pointer" }}></div>
                </div>
              </div>
            </div>
          </div>
          ;
        </div>
        );
      </div>
    </div>
  );
};

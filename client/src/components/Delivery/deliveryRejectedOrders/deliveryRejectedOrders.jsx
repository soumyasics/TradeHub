import img1 from "../../../assets/images/airpods1.png"
export const DeliveryRejectedOrders = () => {
  return (
    <div>
      <div className="delivery-viewItems-body">
        <h1 className="delivery-viewItems-heading text-center">Rejected orders</h1>
        <div style={{ cursor: "pointer" }}>
          <div className="delivery-viewItems-box">
            <div className="container text-center">
              <div className="row">
                <div className="col-4 delivery-viewItems-left-box">
                  <img style={{ width: "50%" }} src={img1}  alt="Item" />
                </div>
                <div className="col-5 delivery-viewItems-middle-box">
                  <table>
                    <thead>
                      <tr>
                        <td>Items name</td>
                        <td>:</td>
                        <td className="delivery-view_Items-data"></td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Customer name</td>
                        <td>:</td>
                        <td className="delivery-view_Items-data"></td>
                      </tr>
                      <tr>
                        <td>Phone number</td>
                        <td>:</td>
                        <td className="delivery-view_Items-data"></td>
                      </tr>
                      <tr>
                        <td>Condition</td>
                        <td>:</td>
                        <td className="delivery-view_Items-data"></td>
                      </tr>              
                    </tbody>
                  </table>
                </div>
                <div className="col-3 delivery-viewItems-right-box">
                  <div className="deliveryView-right-inner-box">
                    <div className="deliveryItemView-pending bg-danger"></div>
                    <p className="delivery-view-item-acceted">Rejected</p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        ;
      </div>
    </div>
  );
};

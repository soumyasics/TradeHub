import "./requests.css";
import img1 from "../../../assets/images/productImg.jpeg";
import exchange_icon from "../../../assets/images/tabler_exchange.svg";
import chat_img from "../../../assets/images/chat-btn.svg";

export const ReceivedRequest = () => {
  const data = [
    {
      myitemProduct: "sofa",
      myitemCategory: "Home Appliances",
      myitemDescripation: "Ifb 7kg 5 star AI powerd front load washing machine",
      receivedProduct: "Airpods",
      receivedCategory: "Electronics",
      receivedDescription: "Airpods with 35 hrs Playback.",
      productPhoto: img1,
    },
    {
      myitemProduct: "sofa",
      myitemCategory: "Home Appliances",
      myitemDescripation: "Ifb 7kg 5 star AI powerd front load washing machine",
      receivedProduct: "Airpods",
      receivedCategory: "Electronics",
      receivedDescription: "Airpods with 35 hrs Playback.",
      productPhoto: img1,
    },
  ];
  return (
    <div className="mt-5">
      <div className="text-center">
        <h3>Received Request</h3>
      </div>
      <div className="exchangeproduct-main">
        {data.map((e) => {
          return (
            <div className="exchangeproduct-box">
              <div className="exchangeproduct-boxcontent d-flex">
                {/* myitems */}
                <div className="exchangeproduct-myitems">
                  <div className="exchangeproduct-myitems-head">My Items</div>
                  <div className="exchangeproduct-myitems-photo">
                    <img src={e.productPhoto} alt="Product Image" />
                  </div>
                  <div className="exchangeproduct-myitems-detail">
                    <table>
                      <tr>
                        <td style={{ fontWeight: "600" }}>Item name</td>
                        <td>:</td>
                        <td>{e.myitemProduct}</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "600" }}>Category</td>
                        <td>:</td>
                        <td>{e.myitemCategory}</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "600" }}>Description</td>
                        <td>:</td>
                        <td>{e.myitemDescripation}</td>
                      </tr>
                    </table>
                    <span className="viewmore">
                      <button>View more</button>
                    </span>
                  </div>
                </div>

                <div className="exchange-icon">
                  <img src={exchange_icon} alt="" />
                </div>

                {/* receiveditem */}

                <div className="exchangeproduct-receiveditems">
                  <div className="exchangeproduct-receiveditems-head">
                    Received request
                  </div>
                  <div className="exchangeproduct-receiveditems-photo">
                    <img src={e.productPhoto} alt="Product Image" />
                  </div>
                  <div className="exchangeproduct-receiveditems-detail">
                    <table>
                      <tr>
                        <td style={{ fontWeight: "600" }}>Item name</td>
                        <td>:</td>
                        <td>{e.receivedProduct}</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "600" }}>Category</td>
                        <td>:</td>
                        <td>{e.receivedCategory}</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "600" }}>Description</td>
                        <td>:</td>
                        <td>{e.receivedDescription} </td>
                      </tr>
                    </table>
                    <span className="viewmore">
                      <button>View more</button>
                    </span>
                  </div>
                </div>
                <div className="exchangeProduct-order-pending">
                  <input type="radio" />
                  Pending
                </div>
                <div className="exchangeProduct-chat-btn">
                  <button>
                    <img src={chat_img} alt="icon" />
                    Chat
                  </button>
                </div>
              </div>
              <span className="exchangeaccept-reject d-flex">
                <button type="button" class="btn btn-success">
                  Accept
                </button>
                <button type="button" class="btn btn-danger">
                  Reject
                </button>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

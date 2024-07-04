import "./userTransaction.css";
import img1 from "../../../assets/images/itemDetailsPoints.png";
import img2 from "../../../assets/images/userTransactionImage.png";
import img3 from "../../../assets/images/userTransactionImage2.svg";

export const UserTransaction = () => {
  const userTransactionData = [
    {
      user1Name: "Nitisha",
      user1Contact: 1234567890,
      user1Address: "22/12-23 ,kazhakootam,Trivandrum,kerala.",
      user1ItemName: "Sofa",
      user1Category: "homeappliances",
      user1Condition: "Airpods with 35 hrs Playback.",
      user1points: 350,
      user1Image: img2,

      user2Name: "Nitisha",
      user2Contact: 1234567890,
      user2Address: "22/12-23 ,kazhakootam,Trivandrum,kerala.",
      user2ItemName: "Sofa",
      user2Category: "home appliances",
      user2Condition: "Airpods with 35 hrs Playback.",
      user2points: 350,
      user2Image: img2,
    },
    {
      user1Name: "Nitisha",
      user1Contact: 1234567890,
      user1Address: "22/12-23 ,kazhakootam,Trivandrum,kerala.",
      user1ItemName: "Sofa",
      user1Category: "homeappliances",
      user1Condition: "Airpods with 35 hrs Playback.",
      user1points: 350,
      user1Image: img2,

      user2Name: "Nitisha",
      user2Contact: 1234567890,
      user2Address: "22/12-23 ,kazhakootam,Trivandrum,kerala.",
      user2ItemName: "Sofa",
      user2Category: "home appliances",
      user2Condition: "Airpods with 35 hrs Playback.",
      user2points: 350,
      user2Image: img2,
    },
    {
      user1Name: "Nitisha",
      user1Contact: 1234567890,
      user1Address: "22/12-23 ,kazhakootam,Trivandrum,kerala.",
      user1ItemName: "Sofa",
      user1Category: "homeappliances",
      user1Condition: "Airpods with 35 hrs Playback.",
      user1points: 350,
      user1Image: img2,

      user2Name: "Nitisha",
      user2Contact: 1234567890,
      user2Address: "22/12-23 ,kazhakootam,Trivandrum,kerala.",
      user2ItemName: "Sofa",
      user2Category: "home appliances",
      user2Condition: "Airpods with 35 hrs Playback.",
      user2points: 350,
      user2Image: img2,
    },
  ];
  return (
    <div>
      <div className="userTransaction-main">
        {userTransactionData.map((e) => {
          return (
            <div>
              <div className="userTransaction-box">
                <div className="userTransaction-boxcontent d-flex">
                  {/* myitems */}
                  <div className="userTransaction-myitems">
                    <div className="userTransaction-myitems-head">User 1</div>
                    <div className="userTransaction-myitems-photo">
                      {/* <img src={e.productPhoto} alt="Product Image" /> */}
                    </div>
                    <div className="userTransaction-myitems-detail">
                      <table>
                        <tr>
                          <th style={{ fontWeight: "600" }}>Name</th>
                          <td>:</td>
                          <td>{e.user1Name}</td>
                        </tr>
                        <tr>
                          <th style={{ fontWeight: "600" }}>Contact</th>
                          <td>:</td>
                          <td>{e.user1Contact}</td>
                        </tr>
                        <tr>
                          <th style={{ fontWeight: "600" }}>Adress</th>
                          <td>:</td>
                          <td>{e.user1Address}</td>
                        </tr>
                      </table>
                    </div>
                  </div>

                  {/* receiveditem */}

                  <div className="userTransaction-receiveditems">
                    <div className="userTransaction-receiveditems-head">
                      Product details
                    </div>
                    <div className="userTransaction-receiveditems-photo">
                      {/* <img src={e.productPhoto} alt="Product Image" /> */}
                    </div>
                    <div className="userTransaction-receiveditems-detail">
                      <table>
                        <tr>
                          <th style={{ fontWeight: "600" }}>Item name</th>
                          <td>:</td>
                          <td>{e.user1ItemName}</td>
                        </tr>
                        <tr>
                          <th style={{ fontWeight: "600" }}>Category</th>
                          <td>:</td>
                          <td>{e.user1Category}</td>
                        </tr>
                        <tr>
                          <th style={{ fontWeight: "600" }}>Condition</th>
                          <td>:</td>
                          <td>{e.user1Condition} </td>
                        </tr>
                        <tr>
                          <th style={{ fontWeight: "600" }}>Points</th>
                          <td>:</td>
                          <td>
                            <div className="userTransaction-point-box d-flex">
                              <img src={img1} alt="" />
                              <p>{e.user1points}</p>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                  <div className="userTransaction-right-image">
                    <img src={e.user1Image} alt="" />
                  </div>
                </div>
                <div className="userTransaction-center-image">
                  <img src={img3} alt="" />
                </div>
              </div>

              <div className="userTransaction-box">
                <div className="userTransaction-boxcontent d-flex">
                  {/* myitems */}
                  <div className="userTransaction-myitems">
                    <div className="userTransaction-myitems-head">User 2</div>
                    <div className="userTransaction-myitems-photo">
                      {/* <img src={e.productPhoto} alt="Product Image" /> */}
                    </div>
                    <div className="userTransaction-myitems-detail">
                      <table>
                        <tr>
                          <th style={{ fontWeight: "600" }}>Name</th>
                          <td>:</td>
                          <td>{e.user2Name}</td>
                        </tr>
                        <tr>
                          <th style={{ fontWeight: "600" }}>Contact</th>
                          <td>:</td>
                          <td>{e.user2Contact}</td>
                        </tr>
                        <tr>
                          <th style={{ fontWeight: "600" }}>Adress</th>
                          <td>:</td>
                          <td>{e.user2Address}</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                  {/* receiveditem */}
                  <div className="userTransaction-receiveditems ">
                    <div className="userTransaction-receiveditems-head">
                      Product details
                    </div>
                    <div className="userTransaction-receiveditems-detail">
                      <table>
                        <tr>
                          <th style={{ fontWeight: "600" }}>Item name</th>
                          <td>:</td>
                          <td>{e.user2ItemName}</td>
                        </tr>
                        <tr>
                          <th style={{ fontWeight: "600" }}>Category</th>
                          <td>:</td>
                          <td>{e.user2Category}</td>
                        </tr>
                        <tr>
                          <th style={{ fontWeight: "600" }}>Condition</th>
                          <td>:</td>
                          <td>{e.user2Condition} </td>
                        </tr>
                        <tr>
                          <th style={{ fontWeight: "600" }}>Points</th>
                          <td>:</td>
                          <td>
                            <div className="userTransaction-point-box d-flex">
                              <img src={img1} alt="" />
                              <p>{e.user2points}</p>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>{" "}
                  <div className="userTransaction-right-image">
                    <img src={e.user2Image} alt="" />
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

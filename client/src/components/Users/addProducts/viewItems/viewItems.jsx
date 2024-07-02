import "./viewItems.css";
import img1 from "../../../../assets/images/viewItemsImage.png";
import img2 from "../../../../assets/images/userViewItemsDelete.svg";
export const ViewItems = () => {
  const userItems = [
    {
      ItemsName: "Airpods",
      category: "Electonics",
      ItemDescription:
        "Airpods with 35hrs playback,13mm Drives blutooth headset",
    },
    {
      ItemsName: "Airpods",
      category: "Electonics",
      ItemDescription:
        "Airpods with 35hrs playback,13mm Drives blutooth headset",
    },
    {
      ItemsName: "Airpods",
      category: "Electonics",
      ItemDescription:
        "Airpods with 35hrs playback,13mm Drives blutooth headset",
    },
    {
      ItemsName: "Airpods",
      category: "Electonics",
      ItemDescription:
        "Airpods with 35hrs playback,13mm Drives blutooth headset",
    },
  ];
  return (
    <div className="user-viewItems-body">
      <h1 className="user-viewItems-heading">My items</h1>

      {userItems.map((e) => {
        return (
          <>
            <div className="user_viewItems-box">
              <div class="container text-center">
                <div class="row">
                  <div class="col-4 user-viewItems-left-box">
                    <img src={img1} alt="" />
                  </div>
                  <div class="col-6 user-viewItems-middle-box">
                    <table>
                      <tr>
                        <td>Items name</td>
                        <td>:</td>
                        <td className="user-view_Items-data">{e.ItemsName}</td>
                      </tr>
                      <tr>
                        <td>Category</td>
                        <td>:</td>
                        <td className="user-view_Items-data">{e.category}</td>
                      </tr>
                      <tr>
                        <td>Item description</td>
                        <td>:</td>
                        <td className="user-view_Items-data">
                          {e.ItemDescription}
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div class="col-2 user-viewItems-right-box">
                    <div className="userView-right-inner-box">
                      <div className="userItemView-pending bg-danger"></div>
                      <p>pending</p>
                    </div>
                    <img src={img2} alt="" />
                  </div>
                </div>
              </div>
            </div>
            ;
          </>
        );
      })}
    </div>
  );
};

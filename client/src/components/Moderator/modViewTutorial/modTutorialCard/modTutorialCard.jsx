import "./modTutorialCard.css";
import img1 from "../../../../assets/images/cloths.png";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../apis/axiosInstance";
import { BASE_URL } from "../../../../apis/baseURL";
import { Link } from "react-router-dom";

export const ModTutorialCard = ({ changeSelected }) => {
  const [data, setData] = useState([]);
  const getData = async () => {
    const response = await axiosInstance.get("/allVideoTutorials");
    try {
      if (response.status == 200) {
        let vid = response.data.data;
        vid = vid.reverse();
        setData(vid);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const viewMoreClicked = (value) => {
    changeSelected(value);
  };
  return (
    <div className="tutorial-card-body">
      <h2 className="py-5" style={{ textAlign: "center" }}>
        View Tutorials
      </h2>
      <div className="d-flex flex-wrap gap-5 justify-content-evenly px-5">
        {data.map((e) => {
          const img1 = `${BASE_URL}${e?.thumbnail?.filename}`;

          return (
            <div>
              <div className="modTutorial-card-box ">
                <img src={img1} alt="" />
                <p className="modTutorialCard-description">
                  {e?.description?.length > 15
                    ? e.description?.substring(0, 15) + "..."
                    : e?.description}
                </p>
                {/* <Link to={`/moderator/tutorial-details/${e._id}`}  className="modTutorialDetails-viewmore">view more</Link> */}
                <button
                  className="modTutorial-button"
                  onClick={() => {
                    viewMoreClicked(e._id);
                  }}
                >
                  Watch Tutorial
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

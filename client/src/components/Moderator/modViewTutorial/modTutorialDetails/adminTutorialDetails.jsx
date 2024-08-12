import { useEffect, useState } from "react";
import "./modTutorialDetails.css";
import axiosInstance from "../../../../apis/axiosInstance";
import { BASE_URL } from "../../../../apis/baseURL";
import { FaArrowLeft } from "react-icons/fa";
import { Button } from "react-bootstrap";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export const AdminTutorialDetails = ({ selectedVideoId, changeSelected }) => {
  const [data, setData] = useState(null); // Initialize with null
  const [videoUrl, setVideoUrl] = useState();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (data) {
      const tutorialVideoLink = data?.video?.filename || null;
      let URL;

      if (tutorialVideoLink) {
        URL = `${BASE_URL}${tutorialVideoLink}`;
      }

      if (URL && isValidVideoURL(URL)) {
        setVideoUrl(URL);
      } else {
        console.log("Video url might be wrong.");
        setVideoUrl(null);
      }
    }
  }, [data]);

  const deleteVideo = async () => {
    try {
      const res = await axiosInstance.delete(
        `/deleteTutorialById/${selectedVideoId}`
      );

      if (res.status === 200) {
        toast.error("Video deleted successfully");
        changeSelected("")
      }
    } catch (error) {
      console.log("Error on delete video", error);
    }
  };
  const getData = async () => {
    try {
      const response = await axiosInstance.get(
        `/getTutorialById/${selectedVideoId}`
      );
      if (response.status === 200) {
        setData(response.data.data); // Ensure response.data.data is correctly accessed
      }
    } catch (error) {
      console.log(error);
    }
  };

  function isValidVideoURL(url) {
    if (typeof url !== "string") return false; // Check if url is a string
    const videoExtensions = [
      ".mp4",
      ".avi",
      ".mov",
      ".wmv",
      ".mkv",
      ".flv",
      ".webm",
      ".ogg",
      ".m4v",
    ];

    let fileExtension = url.substring(url.lastIndexOf(".")).toLowerCase();
    return videoExtensions.includes(fileExtension);
  }

  return (
    <div className="modTutorial-details-body">
      <div className="text-center justify-content-center mt-5">
        <h2 className="modTutorial-title">{data?.title}</h2>
      </div>

      <FaArrowLeft
        className="modTutorial-left-arrow"
        onClick={() => {
          changeSelected("");
        }}
      />

      <div className="modTutorial-details-view-video">
        <iframe
          width="70%"
          height="450px"
          src={videoUrl}
          title="Video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="text-justify">
        <p className="modTutorial-description">{data?.description}</p>
      </div>
      <div className="d-flex justify-content-center">
        <Button variant="danger" onClick={deleteVideo}>
          {" "}
          Delete Video{" "}
        </Button>
      </div>
    </div>
    
  );
};

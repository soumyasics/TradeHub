import { useEffect, useState } from "react";
import "./modTutorialDetails.css";
import axiosInstance from "../../../../apis/axiosInstance";
import { BASE_URL } from "../../../../apis/baseURL";
import { FaArrowLeft } from "react-icons/fa";

export const ModTutorialDetails = ({selectedVideoId, changeSelected}) => {
  const [data, setData] = useState(null);  // Initialize with null
  const [videoUrl, setVideoUrl] = useState();

  console.log("select", selectedVideoId)
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

  const getData = async () => {
    try {
      const response = await axiosInstance.get(`/getTutorialById/${selectedVideoId}`);
      if (response.status === 200) {
        setData(response.data.data);  // Ensure response.data.data is correctly accessed
      }
    } catch (error) {
      console.log(error);
    }
  };

  function isValidVideoURL(url) {
    if (typeof url !== 'string') return false;  // Check if url is a string
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
       changeSelected("")
     }} />
      
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
    </div>
  );
};

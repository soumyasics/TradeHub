const multer = require("multer");
const { TrainingVideoModel } = require("./trainingVideosSchema");
const { default: mongoose } = require("mongoose");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadVideo = multer({ storage: storage }).any();

const addTutorial = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newVideoTutorial = await new TrainingVideoModel({
      title,
      description,
      thumbnail: req.files[0],
      video: req.files[1],
    });

    await newVideoTutorial.save();
    return res.status(200).json({
      message: "Video tutorial added successfully",
      videoTutorial: newVideoTutorial,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to add video tutorial.", error: error.message });
  }
};

const getAllTutorials = async (req, res) => {
  try {
    const videoTutorials = await TrainingVideoModel.find();
    return res.status(200).json({
      message: "All Video Tutorials",
      data: videoTutorials,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to add video tutorial.", error: error.message });
  }
};

const getTutorialById = async (req, res) => {
  try {
    const id = req.params.id;
    
    const videoTutorial = await TrainingVideoModel.findById(id);

    if (!videoTutorial) {
      return res.status(404).json({ message: "Video tutorial not found" });
    }
    return res.status(200).json({
      data: videoTutorial,
      message: "Video Tutorial",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get  video  tutorial by id.",
      error: error.message,
    });
  }
};

module.exports = {
  addTutorial,
  uploadVideo,
  getAllTutorials,
  getTutorialById,
};

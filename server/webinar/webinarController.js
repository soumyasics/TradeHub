const { WebinarModel } = require("./webinarSchema");
const mongoose = require("mongoose");

const createWebinar = async (req, res) => {
  try {
    const { topic, speakers, date, time, duration, description, webinarLink } =
      req.body;

      if (!topic || !speakers || !date || !time || !duration || !description || !webinarLink) {
        return res.status(400).json({ message: "Please fill all the fields" });
      }

    const newWebinar = new WebinarModel({
      topic,
      speakers,
      date,
      time,
      duration,
      description,
      webinarLink,
    });
    await newWebinar.save();
    return res.status(200).json({
      message: "Webinar created successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const allWebinars = async (req, res) => {
  try {
    const webinars = await WebinarModel.find();
    return res.status(200).json({ webinars });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const deleteWebinar = async (req, res) => {
  try {
    const { id } = req.params;
    await WebinarModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Webinar deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
module.exports = { createWebinar, allWebinars , deleteWebinar};
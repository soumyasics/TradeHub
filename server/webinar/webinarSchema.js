const mongoose = require("mongoose");
const { Schema } = mongoose;
const webinarSchema = Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    speakers: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    webinarLink: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const WebinarModel = mongoose.model("webinar", webinarSchema);
module.exports = { WebinarModel }
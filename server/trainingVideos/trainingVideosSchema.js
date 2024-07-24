const mongoose = require("mongoose");

const trainingVideoSchema = new mongoose.Schema(
  {
    video: {
      type: Object,
      required: true,
    },
    thumbnail: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const TrainingVideoModel = mongoose.model("TrainingVideo", trainingVideoSchema);

module.exports = { TrainingVideoModel };

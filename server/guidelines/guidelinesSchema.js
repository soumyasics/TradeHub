const mongoose = require("mongoose");
const { Schema } = mongoose;
const guidelineSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const GuidelineModel = mongoose.model("guidelines", guidelineSchema);
module.exports = { GuidelineModel };

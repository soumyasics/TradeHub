const mongoose = require("mongoose");

const mSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  profile: {
    type: Object,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  adminApproved: {
    type: String,
    enum: ["pending", "approve", "reject"],
    default: "pending",
  },
});
module.exports = mongoose.model("moderators", mSchema);

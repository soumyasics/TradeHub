const mongoose = require("mongoose");

const sSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    category: {
      type: String,
      required: true,
    },
    condition: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    itemPhoto: {
      type: Object,
      required: true,
    },
    wishlistedUsersId: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "users",
      default: [],
    },
    listing: {
      type: String,
      default: "",
    },
    approvedModId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "moderators",
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isExchanged: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    point: {
      type: Number,
      default: 0,
    },
    isModApproved: {
      type: String,
      enum: ["pending", "approve", "reject"],
      default: "pending",
    },
  },
  {
    required: true,
  }
);
module.exports = mongoose.model("items", sSchema);

const mongoose = require("mongoose");

const dSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    contact: {
      type: String,
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
      required: true,
    },
    address: {
      type: String,
      required: true,
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
    acceptedOrders: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "exchangeProduct",
      default: [],
    },
    rejectedOrders: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "exchangeProduct",
      default: [],
    },
    myPendingDeliveries: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "exchangeProduct",
      default: [],
    },
    myDeliveredOrders: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "exchangeProduct",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
const DeliveryModel = mongoose.model("delivery-partner", dSchema);

module.exports = { DeliveryModel };

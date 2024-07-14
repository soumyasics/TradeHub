const mongoose = require("mongoose");
const { Schema } = mongoose;
const ExchangeProductSchema = Schema(
  {
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    buyerProductId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "items",
      required: true,
    },
    sellerProductId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "items",
      required: true,
    },
    sellerResponseStatus: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    deliveryStatus: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "rejected",
        "collected",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },
    isExchangeRequestActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
const ExchangeProductModel = mongoose.model(
  "exchangeProduct",
  ExchangeProductSchema
);
module.exports = { ExchangeProductModel };

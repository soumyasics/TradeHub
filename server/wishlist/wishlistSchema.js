const mongoose = require("mongoose");
const { Schema } = mongoose;
const wishlistSchema = Schema(
  {
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "items",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const WishlistModel = mongoose.model("wishlist", wishlistSchema);
module.exports = { WishlistModel };

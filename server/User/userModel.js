const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
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

      dropDups: true,
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
    interests: {
      Books: {
        type: Number,
        default: 0,
      },
      Electronics: {
        type: Number,
        default: 0,
      },
      Jewellery: {
        type: Number,
        default: 0,
      },
      HomeAppliances: {
        type: Number,
        default: 0,
      },
      Clothing: {
        type: Number,
        default: 0,
      },
      Furniture: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("users", userSchema);

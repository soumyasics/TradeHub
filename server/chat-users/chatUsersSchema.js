const mongoose = require("mongoose");
const { Schema } = mongoose;
const ChatUsersSchema = Schema(
  {
    message: {
      type: String,
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const ChatUserModel = mongoose.model("chatUsers", ChatUsersSchema);
module.exports = { ChatUserModel };

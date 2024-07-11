const mongoose = require('mongoose')

const { ChatUserModel } = require("./chatUsersSchema");

const sendMessage = async (req, res) => {
  try {
    const { message, senderId, receiverId } = req.body;

    if (!message || !senderId || !receiverId) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // check valid object id
    if (
      !mongoose.Types.ObjectId.isValid(senderId) ||
      !mongoose.Types.ObjectId.isValid(receiverId)
    ) {
      return res.status(400).json({ msg: "Invalid user id" });
    }

    if (senderId === receiverId) {
      return res.status(400).json({ msg: "Sender and receiver can't be same" });
    }

    const chatUser = new ChatUserModel({
      message,
      senderId,
      receiverId,
    });
    await chatUser.save();
    return res.status(200).json({ msg: "Message sent successfully" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    if (!senderId || !receiverId) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // check valid object id
    if (
      !mongoose.Types.ObjectId.isValid(senderId) ||
      !mongoose.Types.ObjectId.isValid(receiverId)
    ) {
      return res.status(400).json({ msg: "Invalid user id" });
    }

    if (senderId === receiverId) {
      return res.status(400).json({ msg: "Sender and receiver can't be same" });
    }

    const messages = await ChatUserModel.find({
      $or: [{ senderId, receiverId }, { senderId: receiverId, receiverId: senderId }],
    });
    return res.status(200).json({ messages });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};


module.exports = { sendMessage, getMessages };
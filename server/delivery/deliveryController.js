const { default: mongoose } = require("mongoose");
const { DeliveryModel } = require("./deliverySchema");
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },

  filename: function (req, file, cb) {
    const uniquePrefix = "prefix-"; // Add your desired prefix here
    const originalname = file.originalname;
    const extension = originalname.split(".").pop();
    const filename =
      uniquePrefix +
      originalname.substring(0, originalname.lastIndexOf(".")) +
      "-" +
      Date.now() +
      "." +
      extension;
    cb(null, filename);
  },
});
const upload = multer({ storage: storage }).single("profile");

const registerDelivery = async (req, res) => {
  try {
    const { firstname, lastname, email, contact, password, gender, address } =
      req.body;

    const delivery = await DeliveryModel.findOne({ email });
    if (delivery) {
      return res
        .status(409)
        .json({ msg: "email Already Registered With Us !!", data: null });
    }

    const newUser = new DeliveryModel({
      firstname,
      lastname,
      email,
      contact,
      password,
      gender,
      address,
      profile: req.file,
    });
    await newUser.save();

    return res
      .status(201)
      .json({ msg: "Delivery Partner created", data: delivery });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const loginDelivery = async (req, res) => {
  try {
    const { email, password } = req.body;
    const delivery = await DeliveryModel.findOne({ email, password });
    if (!delivery) {
      return res
        .status(404)
        .json({ msg: "Please check your credentials", data: null });
    }
    return res
      .status(200)
      .json({ msg: "Delivery Partner logged in", data: delivery });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const forgotPasswordDelivery = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({ msg: "Email and password is required." });
    }
    const delivery = await DeliveryModel.findOne({ email });
    if (!delivery) {
      return res.status(404).json({ msg: "Please check your credentials." });
    }
    const newDelivery = await DeliveryModel.findOneAndUpdate(
      { email },
      { password }
    );
    return res.status(200).json({
      msg: "Password updated successfully.",
      data: newDelivery,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Internal server error. Please try again later.",
    });
  }
};

const updateDelivery = async (req, res) => {
  try {
    const { id: deliveryId } = req.params;
    const { firstname, lastname, email, contact, password, gender, address } =
      req.body;

    if (!mongoose.Types.ObjectId.isValid(deliveryId)) {
      return res
        .status(404)
        .json({ msg: "Delivery Partner not found", data: null });
    }
    const delivery = await DeliveryModel.findById(deliveryId);
    if (!delivery) {
      return res
        .status(404)
        .json({ msg: "Delivery Partner not found", data: null });
    }
    let updatingObj = {};
    if (firstname) {
      updatingObj.firstname = firstname;
    }
    if (lastname) {
      updatingObj.lastname = lastname;
    }
    if (email) {
      updatingObj.email = email;
    }
    if (contact) {
      updatingObj.contact = contact;
    }
    if (password) {
      updatingObj.password = password;
    }
    if (gender) {
      updatingObj.gender = gender;
    }
    if (address) {
      updatingObj.address = address;
    }

    const updatedDelivery = await DeliveryModel.findByIdAndUpdate(
      deliveryId,
      updatingObj,
      { new: true }
    );
    return res.status(200).json({
      msg: "Delivery Partner updated successfully",
      data: updatedDelivery,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  upload,
  registerDelivery,
  loginDelivery,
  forgotPasswordDelivery,
  updateDelivery,
};

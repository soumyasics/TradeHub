const { default: mongoose } = require("mongoose");
const { DeliveryModel } = require("./deliverySchema");
const multer = require("multer");
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

    if (delivery.adminApproved === "pending") {
      return res
        .status(400)
        .json({ msg: "Please wait for admin approval", data: delivery });
    }
    if (delivery.adminApproved === "rejected") {
      return res
        .status(400)
        .json({ msg: "Your account has been rejected", data: delivery });
    }
    if(!delivery.isActive) {
      return res
        .status(400)
        .json({ msg: "Your account has been deactivated", data: delivery });
    }
    return res
      .status(200)
      .json({ msg: "Delivery Partner logged in", data: delivery });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// Forgot Password for Moderator
const forgotPassword = (req, res) => {
  DeliveryModel.findOneAndUpdate(
    { email: req.body.email },
    { password: req.body.password }
  )
    .exec()
    .then((data) => {
      if (data != null)
        res.json({
          status: 200,
          msg: "Updated successfully",
        });
      else
        res.json({
          status: 500,
          msg: "User not found",
        });
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        msg: "Data not updated",
        Error: err,
      });
    });
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

const allPendingDelivery = async (req, res) => {
  try {
    const allDelivery = await DeliveryModel.find({ adminApproved: "pending" });
    return res.status(200).json({ data: allDelivery });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const allAcceptedDelivery = async (req, res) => {
  try {
    const allDelivery = await DeliveryModel.find({ adminApproved: "accepted" });
    return res
      .status(200)
      .json({ data: allDelivery, msg: "All accepted delivery agents" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
const allRejectedDelivery = async (req, res) => {
  try {
    const allDelivery = await DeliveryModel.find({
      adminApproved: "rejected",
      msg: "All rejected delivery agents",
    });
    return res.status(200).json({ data: allDelivery, msg: "All rejected delivery agents" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const approveDeliveryAgentById = async (req, res) => {
  try {
    const { id } = req.params;
    const delivery = await DeliveryModel.findById(id);
    if (!delivery) {
      return res
        .status(404)
        .json({ msg: "Delivery Partner not found", data: null });
    }

    const updatedDelivery = await DeliveryModel.findByIdAndUpdate(
      id,
      {
        adminApproved: "accepted",
      },
      { new: true }
    );

    return res.status(200).json({
      msg: "Delivery Partner approved successfully",
      data: updatedDelivery,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
const activeDeliveryAgentById = async (req, res) => {
  try {
    const { id } = req.params;
    const delivery = await DeliveryModel.findById(id);
    if (!delivery) {
      return res
        .status(404)
        .json({ msg: "Delivery Partner not found", data: null });
    }

    const updatedDelivery = await DeliveryModel.findByIdAndUpdate(
      id,
      {
        isActive: true,
      },
      { new: true }
    );

    return res.status(200).json({
      msg: "Delivery Partner approved successfully",
      data: updatedDelivery,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
const inActiveDeliveryAgentById = async (req, res) => {
  try {
    const { id } = req.params;
    const delivery = await DeliveryModel.findById(id);
    if (!delivery) {
      return res
        .status(404)
        .json({ msg: "Delivery Partner not found", data: null });
    }

    const updatedDelivery = await DeliveryModel.findByIdAndUpdate(
      id,
      {
        isActive: false,
      },
      { new: true }
    );

    return res.status(200).json({
      msg: "Delivery Partner approved successfully",
      data: updatedDelivery,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const rejectDeliveryAgentById = async (req, res) => {
  try {
    const { id } = req.params;
    const delivery = await DeliveryModel.findById(id);
    if (!delivery) {
      return res
        .status(404)
        .json({ msg: "Delivery Partner not found", data: null });
    }

    const updatedDelivery = await DeliveryModel.findByIdAndUpdate(
      id,
      {
        adminApproved: "rejected",
      },
      { new: true }
    );

    return res.status(200).json({
      msg: "Delivery Partner approved successfully",
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
  forgotPassword,
  updateDelivery,
  allPendingDelivery,
  allRejectedDelivery,
  allAcceptedDelivery,
  approveDeliveryAgentById,
  rejectDeliveryAgentById,
  activeDeliveryAgentById,
  inActiveDeliveryAgentById,
};

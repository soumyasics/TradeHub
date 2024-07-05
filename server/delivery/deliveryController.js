const { DeliveryModel } = require("./deliverySchema");
const multer = require('multer')
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

      const user = await DeliveryModel.findOne({email});
      if (user) {
        return res.status(400).json({msg: "Email already used."})
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
      .json({ message: "Delivery Partner created", data: newUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const loginDelivery = async (req, res) => {
  try {
    const { email, password } = req.body;
    const delivery = await DeliveryModel.findOne({ email, password });
    if (!delivery) {
      return res
        .status(404)
        .json({ message: "Please check your credentials", data: null });
    }
    return res
      .status(200)
      .json({ message: "Delivery Partner logged in", data: delivery });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = { upload, registerDelivery, loginDelivery };

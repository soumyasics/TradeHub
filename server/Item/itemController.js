const Item = require("./itemSchema");
const multer = require("multer");
const mongoose = require("mongoose");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    const uniquePrefix = "prefix-";
    const originalname = file.originalname;
    const extension = originalname.split(".").pop();
    const filename = `${uniquePrefix}${originalname.substring(
      0,
      originalname.lastIndexOf(".")
    )}-${Date.now()}.${extension}`;
    cb(null, filename);
  },
});
const upload = multer({ storage: storage }).single("itemPhoto");

const registerItem = async (req, res) => {
  try {
    const {
      userId,
      name,
      category,
      condition,
      address,
      description,
      quantity,
      pincode,
      location,
    } = req.body;

    if (
      !userId ||
      !name ||
      !category ||
      !condition ||
      !address ||
      !description ||
      !quantity ||
      !pincode ||
      !location
    ) {
      return res.json({
        status: 400,
        msg: "Please fill all the fields",
      });
    }

    console.log("user idd", req.body);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ msg: "Invalid userId", userId });
    }

    console.log("items", req.file);

    const newItem = new Item({
      userId,
      name,
      category,
      condition,
      address,
      description,
      quantity,
      pincode,
      location,
      itemPhoto: req.file,
    });

    console.log("new ite", newItem);

    await newItem.save();
    return res.status(200).json({ msg: "Item added successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const viewAllitemsByUserId = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid userId", id });
    }

    const items = await Item.find({ userId: id });
    return res
      .status(200)
      .json({ msg: "Data obtained successfully", data: items });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// View all Items
const viewActiveItems = (req, res) => {
  Item.find({ isActive: true })
    .populate("userId")
    .exec()
    .then((data) => {
      if (data.length > 0) {
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data: data,
        });
      } else {
        res.json({
          status: 200,
          msg: "No Data obtained",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        msg: "Data not obtained",
        Error: err,
      });
    });
};

// View all Items
const viewItemsToBeApproved = (req, res) => {
  Item.find({ isActive: false })
    .populate("userId")
    .exec()
    .then((data) => {
      if (data.length > 0) {
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data: data,
        });
      } else {
        res.json({
          status: 200,
          msg: "No Data obtained",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        msg: "Data not obtained",
        Error: err,
      });
    });
};

// Update Item by ID
const editItemById = async (req, res) => {
  const {
    name,
    category,
    condition,
    address,
    description,
    quantity,
    pincode,
    location,
  } = req.body;
  const images = {
    img1: req.files.img1 ? req.files.img1[0] : null,
    img2: req.files.img2 ? req.files.img2[0] : null,
    img3: req.files.img3 ? req.files.img3[0] : null,
    img4: req.files.img4 ? req.files.img4[0] : null,
    img5: req.files.img5 ? req.files.img5[0] : null,
    img6: req.files.img6 ? req.files.img6[0] : null,
  };

  await Item.findByIdAndUpdate(
    { _id: req.params.id },
    {
      name,
      category,
      condition,
      address,
      description,
      quantity,
      pincode,
      location,
      ...images,
    }
  )
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Updated successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        msg: "Data not Updated",
        Error: err,
      });
    });
};

// View Item by ID
const viewItemById = (req, res) => {
  Item.findById({ _id: req.params.id })
    .populate("userId")
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Data obtained successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};

// View Item by ID
const viewItemByUserId = (req, res) => {
  Item.find({ userId: req.params.id })
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Data obtained successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};
// Activate Item by ID
const activateItemById = (req, res) => {
  Item.findByIdAndUpdate({ _id: req.params.id }, { isActive: true })
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Data obtained successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};

// Deactivate Item by ID
const deActivateItemById = (req, res) => {
  Item.findByIdAndDelete({ _id: req.params.id })
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Data updated successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};

module.exports = {
  registerItem,
  viewActiveItems,
  editItemById,
  viewItemByUserId,
  viewItemsToBeApproved,
  viewItemById,
  activateItemById,
  viewAllitemsByUserId,
  deActivateItemById,
  upload,
};

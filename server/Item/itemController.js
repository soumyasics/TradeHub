const Item = require("./itemSchema");
const multer = require("multer");
const mongoose = require("mongoose");
const ModeratorModal = require("../Moderator/modSchema");
const UserModel = require("../User/userModel");
const { WishlistModel } = require("../wishlist/wishlistSchema");
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

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ msg: "Invalid userId", userId });
    }

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

    await newItem.save();
    return res.status(200).json({ msg: "Item added successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteItemById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid userId", id });
    }

    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found", id });
    }
    if (item.isExchanged) {
      return res.status(400).json({ message: "Item already exchanged" });
    }

    if (item.isDeleted) {
      return res.status(400).json({ message: "Item already deleted" });
    }
    if (!item.isActive) {
      return res
        .status(400)
        .json({
          message:
            "You already accepted the exchange offer. You can't delete this item",
        });
    }

    const newData = await Item.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
      },
      { new: true }
    );
    await WishlistModel.deleteMany({ itemId: id });

    return res
      .status(200)
      .json({ message: "Item deleted successfully", id, newData });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const viewAllPendingItems = async (req, res) => {
  try {
    const items = await Item.find({
      isModApproved: "pending",
      isDeleted: false,
    })
      .populate("userId")
      .exec();
    return res.status(200).json({ msg: "View all pending items", data: items });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const viewAllApproveItems = async (req, res) => {
  try {
    const items = await Item.find({
      isModApproved: "approve",
      isExchanged: false,
      isActive: true,
      $or: [{ isDeleted: false }, { isDeleted: { $exists: false } }],
    })
      .populate("userId")
      .exec();
    return res.status(200).json({ msg: "View approved items", data: items });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const viewAllApproveItemsForMod = async (req, res) => {
  try {
    const items = await Item.find({
      isModApproved: "approve",
      $or: [{ isDeleted: false }, { isDeleted: { $exists: false } }],
    })
      .populate("userId")
      .exec();
    return res.status(200).json({ msg: "View approved items", data: items });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getApprovedItemsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    if (
      category === "Books" ||
      category === "Electronics" ||
      category === "Jewellery" ||
      category === "Home-Appliances" ||
      category === "Clothing" ||
      category === "Furniture" ||
      category === "Beauty"
    ) {
      const items = await Item.find({
        isModApproved: "approve",
        category,
        isDeleted: false,
      })
        .populate("userId")
        .exec();
      return res
        .status(200)
        .json({ msg: "View approved items by " + category, data: items });
    } else {
      return res.status(400).json({ msg: "Invalid category" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const viewAllRejectItems = async (req, res) => {
  try {
    const items = await Item.find({ isModApproved: "reject" })
      .populate("userId")
      .exec();
    return res
      .status(200)
      .json({ msg: "View all rejected items", data: items });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const itemApproveById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid item id", id });
    }
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ msg: "Item not found", id });
    }

    const newItem = await Item.findByIdAndUpdate(
      id,
      { isModApproved: "approve" },
      { new: true }
    );

    return res
      .status(200)
      .json({ msg: "Item approved successfully", data: newItem });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const itemRejectById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid item id", id });
    }
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ msg: "Item not found", id });
    }

    const newItem = await Item.findByIdAndUpdate(
      id,
      { isModApproved: "reject" },
      { new: true }
    );

    return res
      .status(200)
      .json({ msg: "Item rejected  successfully", data: newItem });
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

    const items = await Item.find({
      userId: id,
      $or: [{ isDeleted: false }, { isDeleted: { $exists: false } }],
    });
    return res
      .status(200)
      .json({ msg: "Data obtained successfully", data: items });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const viewAllActiveitemsByUserId = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid userId", id });
    }

    const items = await Item.find({
      userId: id,
      isActive: true,
      isModApproved: "approve",
      isDeleted: false,
    });
    return res
      .status(200)
      .json({ msg: "Data obtained successfully", data: items });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addPointToItem = async (req, res) => {
  try {
    const { modId, itemId, point, listing } = req.body;

    if (!mongoose.Types.ObjectId.isValid(modId)) {
      return res.status(400).json({ msg: "Invalid modId", modId });
    }
    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ msg: "Invalid itemId", itemId });
    }

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ msg: "Item not found", itemId });
    }

    const mod = await ModeratorModal.findById(modId);
    if (!mod) {
      return res.status(404).json({ msg: "Mod not found", modId });
    }

    item.point = point;
    item.listing = listing;
    item.approvedModId = modId;
    item.isModApproved = "approve";

    await item.save();

    return res
      .status(200)
      .json({ msg: "Point added successfully", data: item });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
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
          data: [],
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

// View Item by ID
const viewItemById = (req, res) => {
  Item.findById(req.params.id)
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

const personalisedRecommendation = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid userId", id });
    }
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found", id });
    }

    const items = await Item.find({
      isModApproved: "approve",
      isExchanged: false,
      isActive: true,
      $or: [{ isDeleted: false }, { isDeleted: { $exists: false } }],
    })
      .populate("userId")
      .exec();

    const interests = user.interests;
    const scoredItems = items.map((item) => {
      let score = 0;
      if (item.category === "Home-Appliances") {
        score = interests["HomeAppliances"] * 2;
      } else {
        score = interests[item.category] * 2;
      }
      return { ...item._doc, score };
    });

    scoredItems.sort((a, b) => b.score - a.score);
    return res
      .status(200)
      .json({ msg: "View approved items", data: scoredItems });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerItem,
  viewActiveItems,
  viewItemByUserId,
  viewItemsToBeApproved,
  viewItemById,
  activateItemById,
  viewAllitemsByUserId,
  viewAllActiveitemsByUserId,
  deActivateItemById,
  upload,
  deleteItemById,
  viewAllPendingItems,
  viewAllApproveItems,
  viewAllRejectItems,
  itemApproveById,
  itemRejectById,
  addPointToItem,
  getApprovedItemsByCategory,
  personalisedRecommendation,
  viewAllApproveItemsForMod,
};

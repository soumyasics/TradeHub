const mongoose = require("mongoose");
const { WishlistModel } = require("./wishlistSchema");
const ItemModel = require("../Item/itemSchema");

const addToWishlist = async (req, res) => {
  try {
    const { itemId, userId } = req.body;
    if (!itemId || !userId) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    if (
      !mongoose.Types.ObjectId.isValid(itemId) ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return res.status(400).json({ msg: "Invalid Id" });
    }

    const wishlistExists = await WishlistModel.findOne({ itemId, userId });
    if (wishlistExists) {
      return res.status(400).json({ msg: "Wishlist already exists" });
    }

    const productItem = await ItemModel.findById(itemId);
    if (!productItem) {
      return res.status(400).json({ msg: "Item not found" });
    }
    // push the userid to product item wishlistedUsersId
    if (!productItem.wishlistedUsersId) {
      productItem.wishlistedUsersId = [];
    }

    if (productItem.wishlistedUsersId.includes(userId)) {
      return res.status(400).json({ msg: "Wishlist already exists" });
    }

    productItem?.wishlistedUsersId?.push(userId);
    const wishlist = new WishlistModel({
      itemId,
      userId,
    });
    await productItem.save();
    await wishlist.save();
    return res
      .status(201)
      .json({ msg: "Wishlist added successfully", data: wishlist });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { itemId, userId, wishlistId } = req.body;
    if (!itemId || !userId || !wishlistId) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    if (
      !mongoose.Types.ObjectId.isValid(itemId) ||
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(wishlistId)
    ) {
      return res.status(400).json({ msg: "Invalid Id" });
    }
    const wishlist = await WishlistModel.findById(wishlistId);
    if (!wishlist) {
      return res.status(400).json({ msg: "Wishlist not found" });
    }
    const productItem = await ItemModel.findById(itemId);
    if (!productItem) {
      return res.status(400).json({ msg: "Item not found" });
    }
    if (!productItem.wishlistedUsersId) {
      productItem.wishlistedUsersId = [];
    }

    productItem.wishlistedUsersId = productItem.wishlistedUsersId.filter(
      (id) => id !== userId
    );

    await WishlistModel.findByIdAndDelete(wishlistId);
    await productItem.save();

    return res
      .status(200)
      .json({ msg: "Wishlist removed successfully", data: wishlist });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const getAllWishlistsByUserId  =async (req, res) => {
  try {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ msg: "Invalid Id" });
    }

    const wishlists = await WishlistModel.find({ userId }).populate("userId").populate("itemId").exec();
    return res
      .status(200)
      .json({ msg: "Data obtained successfully", data: wishlists });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
module.exports = { addToWishlist, getAllWishlistsByUserId, removeFromWishlist };

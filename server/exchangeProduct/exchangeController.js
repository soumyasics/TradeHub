const { ExchangeProductModel } = require("./exchangeProductSchema");
const { ItemModel } = require("../Item/itemSchema");
const { default: mongoose } = require("mongoose");

const sendExchangeRequest = async (req, res) => {
  try {
    const { buyerId, sellerId, buyerProductId, sellerProductId } = req.body;
    if (!buyerId || !sellerId || !buyerProductId || !sellerProductId) {
      return res.status(400).json({ msg: "Please fill all the fields" });
    }

    if (
      !mongoose.Types.ObjectId.isValid(buyerId) ||
      !mongoose.Types.ObjectId.isValid(sellerId) ||
      !mongoose.Types.ObjectId.isValid(buyerProductId) ||
      !mongoose.Types.ObjectId.isValid(sellerProductId)
    ) {
      return res.status(400).json({ msg: "Invalid ID" });
    }
    // check same user with same product request exists

    const isSameExchangeRequestExist = await ExchangeProductModel.findOne({
      buyerId,
      sellerId,
      buyerProductId,
      sellerProductId,
    });

    if (isSameExchangeRequestExist) {
      return res
        .status(400)
        .json({ msg: "Same product exchange request already exists" });
    }

    const newExchangeProduct = new ExchangeProductModel({
      buyerId,
      sellerId,
      buyerProductId,
      sellerProductId,
    });
    await newExchangeProduct.save();

    return res.status(201).json({ msg: "Exchange request sent successfully" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const getAllRequestByBuyerId = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid ID" });
    }

    const exchangeProducts = await ExchangeProductModel.find({
      buyerId: id,
    })
      .populate("buyerProductId")
      .populate("sellerProductId")
      .populate("buyerId")
      .populate("sellerId")
      .exec();
    return res
      .status(200)
      .json({ msg: "All requests by buyer id", data: exchangeProducts });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
const getAllRequestBySellerId = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid ID" });
    }

    const exchangeProducts = await ExchangeProductModel.find({
      sellerId: id,
    })
      .populate("buyerProductId")
      .populate("sellerProductId")
      .populate("buyerId")
      .populate("sellerId")
      .exec();
    return res
      .status(200)
      .json({ msg: "All requests by seller id", data: exchangeProducts });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const getAllExchangeRequests = async (req, res) => {
  try {
    const allReqs = await ExchangeProductModel.find({})
      .populate("buyerProductId")
      .populate("sellerProductId")
      .populate("buyerId")
      .populate("sellerId")
      .exec();

    return res
      .status(200)
      .json({ msg: "All exchange requests", data: allReqs });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const getExchangeReqById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid ID" });
    }
    const exchangeProduct = await ExchangeProductModel.findById(id)
      .populate("buyerProductId")
      .populate("sellerProductId")
      .populate("buyerId")
      .populate("sellerId")
      .exec();

    if (!exchangeProduct) {
      return res.status(404).json({ msg: "Exchange request not found" });
    }
    return res
      .status(200)
      .json({ msg: "All exchange requests", data: exchangeProduct });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const acceptRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid ID" });
    }
    const newRequest = await ExchangeProductModel.findByIdAndUpdate(
      id,
      {
        sellerResponseStatus: "accepted",
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ msg: "Request accepted successfully", data: newRequest });
  } catch (error) {
    return res.status(500).json({ msg: "Server error", error: error.message });
  }
};
const rejectRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid ID" });
    }
    const newRequest = await ExchangeProductModel.findByIdAndUpdate(
      id,
      {
        sellerResponseStatus: "rejected",
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ msg: "Request rejected successfully", data: newRequest });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  sendExchangeRequest,
  getAllRequestByBuyerId,
  getAllRequestBySellerId,
  getAllExchangeRequests,
  getExchangeReqById,
  acceptRequestById,
  rejectRequestById,
};

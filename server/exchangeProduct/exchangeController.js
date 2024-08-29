const { ExchangeProductModel } = require("./exchangeProductSchema");
const ItemModel = require("../Item/itemSchema");
const { default: mongoose } = require("mongoose");
const Item = require("../Item/itemSchema");
const { DeliveryModel } = require("../delivery/deliverySchema");
const UserModel = require("../User/userModel");
const sendExchangeRequest = async (req, res) => {
  try {
    const {
      buyerId,
      sellerId,
      buyerProductId,
      sellerProductId,
      extraPointReqForBuyer,
      pointCreditBackToBuyer,
    } = req.body;
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
    const isSameExchangeRequestExist2 = await ExchangeProductModel.findOne({
      buyerId: sellerId,
      sellerId: buyerId,
      buyerProductId: sellerProductId,
      sellerProductId: buyerProductId,
    });

    if (isSameExchangeRequestExist2) {
      return res
        .status(400)
        .json({ msg: "Same product exchange request already exists" });
    }

    const sellingProduct = await ItemModel.findById(sellerProductId);
    const category = sellingProduct.category;

    const buyingProduct = await ItemModel.findById(buyerProductId);

    if (!category) {
      return res.status(400).json({ msg: "Selling product not found" });
    }

    const user = await UserModel.findById(buyerId);
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    if (!user.interests) {
      user.interests = {
        Books: 0,
        Electronics: 0,
        Jewellery: 0,
        HomeAppliances: 0,
        Clothing: 0,
        Furniture: 0,
      };
    }

    if (category === "Home-Appliances") {
      user.interests.HomeAppliances = user.interests.HomeAppliances + 1;
    } else {
      user.interests[category] = user.interests[category] + 1;
    }

    await user.save();

    const pointVariation = Math.round(
      sellingProduct.point - buyingProduct.point
    );

    const newExchangeProduct = new ExchangeProductModel({
      buyerId,
      sellerId,
      buyerProductId,
      sellerProductId,
      pointVariation,
      extraPointReqForBuyer,
      pointCreditBackToBuyer,
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
      deliveryStatus: "pending"
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
      deliveryStatus: "pending"
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

const getAllDeliveredRequestByBuyerId = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid ID" });
    }

    const exchangeProducts = await ExchangeProductModel.find({
      buyerId: id,
      deliveryStatus: "delivered",
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

const getAllDeliveredRequestBySellerId = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid ID" });
    }

    const exchangeProducts = await ExchangeProductModel.find({
      sellerId: id,
      deliveryStatus: "delivered",
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
    const exchangeReq = await ExchangeProductModel.findById(id);
    const buyerProduct = await Item.findById(exchangeReq.buyerProductId);
    const sellerProduct = await Item.findById(exchangeReq.sellerProductId);

    if (!buyerProduct.isActive) {
      return res.status(400).json({
        msg: "Receiving product is not available right now. It might be already accepted another offer",
      });
    }
    if (!sellerProduct.isActive) {
      return res.status(400).json({
        msg: "Your proudct is not available right now. It might be already accepted another offer",
      });
    }
    if (sellerProduct.isDeleted) {
      return res.status(400).json({
        msg: "Sorry. Product is deleted. You can't accept this offer",
      });
    }
    if (buyerProduct.isDeleted) {
      return res.status(400).json({
        msg: "Sorry. Product is deleted. You can't accept this offer",
      });
    }
    buyerProduct.isActive = false;
    sellerProduct.isActive = false;

    const newRequest = await ExchangeProductModel.findByIdAndUpdate(
      id,
      {
        sellerResponseStatus: "accepted",
      },
      { new: true }
    );

    await buyerProduct.save();
    await sellerProduct.save();

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

const getAllApprovedExchangesBySellerId = async (req, res) => {
  try {
    const sellerId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(sellerId)) {
      return res.status(400).json({ msg: "invalid seller ID" });
    }
    const allReqs = await ExchangeProductModel.find({
      sellerResponseStatus: "accepted",
      sellerId,
      isExchangeRequestActive: true,
    })
      .populate("buyerProductId")
      .populate("sellerProductId")
      .populate("buyerId")
      .populate("sellerId")
      .exec();

    return res
      .status(200)
      .json({ msg: "All approved exchanges by seller id", data: allReqs });
  } catch (error) {
    return res.status(500).json({ error: error.message, msg: "server Error" });
  }
};
const getAllApprovedExchangesByBuyerId = async (req, res) => {
  try {
    const buyerId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(buyerId)) {
      return res.status(400).json({ msg: "invalid buyer ID" });
    }
    const allReqs = await ExchangeProductModel.find({
      sellerResponseStatus: "accepted",
      buyerId,
      isExchangeRequestActive: true,
    })
      .populate("buyerProductId")
      .populate("sellerProductId")
      .populate("buyerId")
      .populate("sellerId")
      .exec();

    return res
      .status(200)
      .json({ msg: "All approved exchanges by seller id", data: allReqs });
  } catch (error) {
    return res.status(500).json({ error: error.message, msg: "server Error" });
  }
};

// deliveries

const getAllPendingDelivery = async (req, res) => {
  try {
    const allReqs = await ExchangeProductModel.find({
      sellerResponseStatus: "accepted",
      deliveryStatus: "pending",
      isExchangeRequestActive: true,
    })
      .populate("buyerProductId")
      .populate("sellerProductId")
      .populate("buyerId")
      .populate("sellerId")
      .exec();

    return res
      .status(200)
      .json({ msg: "All exchange requests", data: allReqs });
  } catch (error) {
    return res.status(500).json({ error: error.message, msg: "server Error" });
  }
};
const getAllAcceptedDelivery = async (req, res) => {
  try {
    const allReqs = await ExchangeProductModel.find({
      sellerResponseStatus: "accepted",
      deliveryStatus: "accepted",
      isExchangeRequestActive: true,
    })
      .populate("buyerProductId")
      .populate("sellerProductId")
      .populate("buyerId")
      .populate("sellerId")
      .exec();

    return res
      .status(200)
      .json({ msg: "All exchange requests", data: allReqs });
  } catch (error) {
    return res.status(500).json({ error: error.message, msg: "server Error" });
  }
};

const getAllAcceptedOrdersByDeliveryAgentId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid delivery agent ID" });
    }

    const deliveryAgent = await DeliveryModel.findById(id);

    if (!deliveryAgent) {
      return res.status(404).json({ msg: "Delivery agent not found" });
    }

    if (
      !deliveryAgent.acceptedOrders ||
      deliveryAgent.acceptedOrders.length === 0
    ) {
      return res
        .status(200)
        .json({ data: [], msg: "No accepted orders found" });
    }

    const acceptedOrders = await ExchangeProductModel.find({
      _id: { $in: deliveryAgent.acceptedOrders },
    })
      .populate("buyerProductId")
      .populate("sellerProductId")
      .populate("buyerId")
      .populate("sellerId")
      .exec();

    return res.status(200).json({
      data: acceptedOrders,
      msg: "all accepted orders by delivery agent id",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message, msg: "server Error" });
  }
};
const getAllDeliveredOrdersByDeliveryAgentId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid delivery agent ID" });
    }

    const deliveryAgent = await DeliveryModel.findById(id);

    if (!deliveryAgent) {
      return res.status(404).json({ msg: "Delivery agent not found" });
    }

    if (
      !deliveryAgent.myDeliveredOrders ||
      deliveryAgent.myDeliveredOrders.length === 0
    ) {
      return res
        .status(200)
        .json({ data: [], msg: "No delivered orders found" });
    }

    const deliveredOrders = await ExchangeProductModel.find({
      _id: { $in: deliveryAgent.myDeliveredOrders },
    })
      .populate("buyerProductId")
      .populate("sellerProductId")
      .populate("buyerId")
      .populate("sellerId")
      .exec();

    return res.status(200).json({
      data: deliveredOrders,
      msg: "all delivered orders by delivery agent id",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message, msg: "server Error" });
  }
};
const getAllDeliveredOrders = async (req, res) => {
  try {
    const deliveredOrders = await ExchangeProductModel.find({
      deliveryStatus: "delivered",
    })
      .populate("buyerProductId")
      .populate("sellerProductId")
      .populate("buyerId")
      .populate("sellerId")
      .exec();

    return res.status(200).json({
      data: deliveredOrders,
      msg: "all delivered orders by delivery agent id",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message, msg: "server Error" });
  }
};
const getAllRejectedOrdersByDeliveryAgentId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid delivery agent ID" });
    }

    const deliveryAgent = await DeliveryModel.findById(id);

    if (!deliveryAgent) {
      return res.status(404).json({ msg: "Delivery agent not found" });
    }

    if (
      !deliveryAgent.rejectedOrders ||
      deliveryAgent.rejectedOrders.length === 0
    ) {
      return res
        .status(200)
        .json({ data: [], msg: "No rejected orders found" });
    }

    const rejectedOrders = await ExchangeProductModel.find({
      _id: { $in: deliveryAgent.rejectedOrders },
    })
      .populate("buyerProductId")
      .populate("sellerProductId")
      .populate("buyerId")
      .populate("sellerId")
      .exec();

    return res.status(200).json({
      data: rejectedOrders,
      msg: "All rejected orders by delivery agent id",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message, msg: "server Error" });
  }
};
const getAllRejectedDelivery = async (req, res) => {
  try {
    const allReqs = await ExchangeProductModel.find({
      sellerResponseStatus: "accepted",
      deliveryStatus: "rejected",
      isExchangeRequestActive: true,
    })
      .populate("buyerProductId")
      .populate("sellerProductId")
      .populate("buyerId")
      .populate("sellerId")
      .exec();

    return res
      .status(200)
      .json({ msg: "All exchange requests", data: allReqs });
  } catch (error) {
    return res.status(500).json({ error: error.message, msg: "server Error" });
  }
};

const acceptDeliveryReqById = async (req, res) => {
  try {
    const { id } = req.params;
    const { deliveryAgentId } = req.body;
    if (!deliveryAgentId) {
      return res.status(400).json({ msg: "Delivery agent id is required." });
    }

    if (!mongoose.Types.ObjectId.isValid(deliveryAgentId)) {
      return res.status(400).json({ msg: "Invalid delivery agent" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid ID" });
    }

    const deliveryAgent = await DeliveryModel.findById(deliveryAgentId);
    if (!deliveryAgent) {
      return res.status(400).json({ msg: "Delivery agent not found" });
    }

    const exchangeReq = await ExchangeProductModel.findById(id);

    if (!exchangeReq) {
      return res.status(400).json({ msg: "Exchange request not found" });
    }

    const buyer = await UserModel.findById(exchangeReq.buyerId);
    if (!buyer) {
      return res.status(400).json({ msg: "Buyer not found" });
    }
    const seller = await UserModel.findById(exchangeReq.sellerId);
    if (!seller) {
      return res.status(400).json({ msg: "Seller not found" });
    }

    const extraPointReqForBuyer = exchangeReq.extraPointReqForBuyer;
    const pointCreditBackToBuyer = exchangeReq.pointCreditBackToBuyer;

    if (pointCreditBackToBuyer > 0) {
      buyer.wallet = buyer.wallet + pointCreditBackToBuyer;
      await buyer.save();
    }
    if (extraPointReqForBuyer > 0) {
      
      const buyerWalletBalance = buyer.wallet;
      if (extraPointReqForBuyer > buyerWalletBalance) {
        return res
          .status(400)
          .json({ msg: "Insufficient balance"});
      } 

      buyer.wallet = buyer.wallet - extraPointReqForBuyer;
      await buyer.save();

      seller.wallet = seller.wallet + extraPointReqForBuyer;
      await seller.save();
    }

    const newRequest = await ExchangeProductModel.findByIdAndUpdate(
      id,
      {
        deliveryStatus: "accepted",
        deliveryAgentId,
      },
      { new: true }
    );

    if (!deliveryAgent.acceptedOrders) {
      deliveryAgent.acceptedOrders = [];
    }

    deliveryAgent.acceptedOrders.push(newRequest._id);
    await deliveryAgent.save();

    return res
      .status(200)
      .json({ msg: "Request accepted successfully", data: newRequest });
  } catch (error) {
    return res.status(500).json({ msg: "Server error", error: error.message });
  }
};
const deliveredProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { deliveryAgentId } = req.body;
    if (!deliveryAgentId) {
      return res.status(400).json({ msg: "Delivery agent id is required." });
    }

    if (!mongoose.Types.ObjectId.isValid(deliveryAgentId)) {
      return res.status(400).json({ msg: "Invalid delivery agent" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid ID" });
    }

    const deliveryAgent = await DeliveryModel.findById(deliveryAgentId);
    if (!deliveryAgent) {
      return res.status(400).json({ msg: "Delivery agent not found" });
    }
    const exchangeReq = await ExchangeProductModel.findById(id);
    if (!exchangeReq) {
      return res.status(400).json({ msg: "Exchange request not found" });
    }

    const buyerProd = await ItemModel.findById(exchangeReq.buyerProductId);
    buyerProd.isExchanged = true;
    
    const sellerProd = await ItemModel.findById(exchangeReq.sellerProductId);
    sellerProd.isExchanged = true;
    await buyerProd.save();
    await sellerProd.save();

    const newRequest = await ExchangeProductModel.findByIdAndUpdate(
      id,
      {
        deliveryStatus: "delivered",
      },
      { new: true }
    );
    
    if (
      deliveryAgent.acceptedOrders &&
      deliveryAgent.acceptedOrders.length > 0
    ) {
      deliveryAgent.acceptedOrders = deliveryAgent.acceptedOrders.filter(
        (orderId) => !orderId.equals(id)
      );
      await deliveryAgent.save();
    }

    // deliveryAgent.acceptedOrders.splice()

    if (!deliveryAgent.myDeliveredOrders) {
      deliveryAgent.myDeliveredOrders = [];
    }

    deliveryAgent.myDeliveredOrders.push(newRequest._id);
    await deliveryAgent.save();

    return res
      .status(200)
      .json({ msg: "Request accepted successfully", data: newRequest });
  } catch (error) {
    return res.status(500).json({ msg: "Server error", error: error.message });
  }
};
const rejectDeliveryReqById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid ID" });
    }
    const { deliveryAgentId } = req.body;
    if (!deliveryAgentId) {
      return res.status(400).json({ msg: "Delivery agent id is required." });
    }

    if (!mongoose.Types.ObjectId.isValid(deliveryAgentId)) {
      return res.status(400).json({ msg: "Invalid delivery agent" });
    }

    const deliveryAgent = await DeliveryModel.findById(deliveryAgentId);
    if (!deliveryAgent) {
      return res.status(400).json({ msg: "Delivery agent not found" });
    }

    const newRequest = await ExchangeProductModel.findById(id);
    if (!newRequest) {
      return res.status(400).json({ msg: "Request not found" });
    }
    // const newRequest = await ExchangeProductModel.findByIdAndUpdate(
    //   id,
    //   {
    //     deliveryStatus: "rejected",
    //   },
    //   { new: true }
    // );

    if (!deliveryAgent.rejectedOrders) {
      deliveryAgent.rejectedOrders = [];
    }

    deliveryAgent.rejectedOrders.push(newRequest._id);
    await deliveryAgent.save();

    return res.status(200).json({
      msg: "Delivery request rejected successfully",
      data: newRequest,
    });
  } catch (error) {
    return res.status(500).json({ msg: "Server error", error: error.message });
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
  getAllPendingDelivery,
  acceptDeliveryReqById,
  rejectDeliveryReqById,
  getAllAcceptedDelivery,
  getAllRejectedDelivery,
  getAllAcceptedOrdersByDeliveryAgentId,
  getAllRejectedOrdersByDeliveryAgentId,
  getAllApprovedExchangesBySellerId,
  getAllApprovedExchangesByBuyerId,
  deliveredProduct,
  getAllDeliveredOrdersByDeliveryAgentId,
  getAllDeliveredOrders,
  getAllDeliveredRequestBySellerId,
  getAllDeliveredRequestByBuyerId,
};

const router = require("express").Router();
const user = require("./User/userController");
const items = require("./Item/itemController");
const Moderator = require("./Moderator/modController");
const DeliveryRoute = require("./delivery/deliveryController");

//user routes
router.post("/registerUser", user.upload, user.registerUser);
router.post("/viewUserById/:id", user.viewUserById);
router.post("/editUserById/:id", user.upload, user.editUserById);
router.post("/forgotPasswordUser", user.forgotPassword);
router.post("/viewUsers", user.viewUsers);
router.post("/deActivateUserById/:id", user.deActivateUserById);
router.post("/activateUserById/:id", user.activateUserById);
router.post("/resetPasswordUser/:id", user.resetPassword);
router.post("/loginUser", user.login);
router.post("/requireAuthUser", user.requireAuth);

//item routes
router.post("/registerItem", items.upload, items.registerItem);
router.get("/viewItemById/:id", items.viewItemById);
router.get("/viewAllPendingItems", items.viewAllPendingItems);
router.get("/viewAllApproveItems", items.viewAllApproveItems);
router.get("/viewAllRejectItems", items.viewAllRejectItems);
router.get("/itemApproveById/:id", items.itemApproveById);
router.get("/itemRejectById/:id", items.itemRejectById);
router.post("/addPointToItem", items.addPointToItem);
router.post("/activateItemById/:id", items.activateItemById);
router.post("/deActivateItemById/:id", items.deActivateItemById);
router.post("/viewItemByUserId/:id", items.viewItemByUserId);
router.post("/viewItemsToBeApproved", items.viewItemsToBeApproved);
router.post("/viewActiveItems", items.viewActiveItems);
router.get("/viewAllitemsByUserId/:id", items.viewAllitemsByUserId);
router.delete("/deleteItemById/:id", items.deleteItemById);

//moderator routes
router.post(
  "/registerModerator",
  Moderator.upload,
  Moderator.registerModerator
);
router.post("/loginModerator", Moderator.login);

router.get("/viewModeratorById/:id", Moderator.viewModeratorById);
router.post(
  "/editModeratorById/:id",
  Moderator.upload,
  Moderator.editModeratorById
);
router.post("/forgotPasswordUserModerators", Moderator.forgotPassword);
router.post("/viewModerators", Moderator.viewModerators);
router.get("/allPendingMods", Moderator.allPendingMods);
router.get("/allApprovedMods", Moderator.allApprovedMods);
router.get("/allRejectedMods", Moderator.allRejectedMods);
router.get("/approveModById/:id", Moderator.approveModById);
router.get("/rejectModById/:id", Moderator.rejectModById);
router.post("/deactivateModeratorById/:id", Moderator.deactivateModeratorById);
router.post("/activateModeratorById/:id", Moderator.activateModeratorById);
router.post("/resetPasswordModeratorUser/:id", Moderator.resetPassword);


// delivery

router.post(
  "/deliverySignup",
  DeliveryRoute.upload,
  DeliveryRoute.registerDelivery
);
router.post("/deliveryLogin", DeliveryRoute.loginDelivery);
router.post("/deliveryForgotPassword", DeliveryRoute.forgotPassword);
router.get("/allPendingDelivery", DeliveryRoute.allPendingDelivery);
router.get("/allAcceptDelivery", DeliveryRoute.allAcceptedDelivery);
router.get("/allRejectDelivery", DeliveryRoute.allRejectedDelivery);
router.get(
  "/approveDeliveryAgentById/:id",
  DeliveryRoute.approveDeliveryAgentById
);
router.get(
  "/rejectDeliveryAgentById/:id",
  DeliveryRoute.rejectDeliveryAgentById
);
router.get(
  "/inActiveDeliveryAgentById/:id",
  DeliveryRoute.inActiveDeliveryAgentById
);
router.get(
  "/activeDeliveryAgentById/:id",
  DeliveryRoute.activeDeliveryAgentById
);
module.exports = router;

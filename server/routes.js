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
router.get("/viewAllItemsPendingItems", items.viewAllItemsPendingItems);
router.post("/viewItemById/:id", items.viewItemById);
router.post("/editItemById/:id", items.upload, items.editItemById);
router.post("/activateItemById/:id", items.activateItemById);
router.post("/deActivateItemById/:id", items.deActivateItemById);
router.post("/viewItemByUserId/:id", items.viewItemByUserId);
router.post("/viewItemsToBeApproved", items.viewItemsToBeApproved);
router.post("/viewActiveItems", items.viewActiveItems);
router.get("/viewAllitemsByUserId/:id", items.viewAllitemsByUserId);
router.delete("/deleteItemById/:id", items.deleteItemById);

//user routes
router.post(
  "/registerModerator",
  Moderator.upload,
  Moderator.registerModerator
);
router.get("/viewModeratorById/:id", Moderator.viewModeratorById);
router.post(
  "/editModeratorById/:id",
  Moderator.upload,
  Moderator.editModeratorById
);
router.post("/forgotPasswordUserModerators", Moderator.forgotPassword);
router.post("/viewModerators", Moderator.viewModerators);
router.post("/deactivateModeratorById/:id", Moderator.deactivateModeratorById);
router.post("/activateModeratorById/:id", Moderator.activateModeratorById);

router.post("/resetPasswordModeratorUser/:id", Moderator.resetPassword);
router.post("/loginModerator", Moderator.login);

// delivery

router.post(
  "/deliverySignup",
  DeliveryRoute.upload,
  DeliveryRoute.registerDelivery
);
router.post(
  "/deliveryLogin",
  DeliveryRoute.loginDelivery
);


module.exports = router;

const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const paths = require("../paths/users/merchantPaths");
const MerchantController = require("./merchant");

// methods
router.get(paths.getSingleMerchant, MerchantController.getById);
router.get(paths.getAllMerchants, MerchantController.getAll);
router.post(paths.merchantSignUp, MerchantController.register);
router.post(paths.merchantLogin, MerchantController.merchantLogin);
router.put(paths.updateMerchant, MerchantController.update);
router.delete(paths.deleteMerchant, MerchantController.delete);
router.post(paths.getCurrentMerchant, MerchantController.getCurrent);

module.exports = router;
const express = require("express");
const router = express.Router();
const paths = require("../../../paths/fund-wallet/fundWalletsByCardsPaths");
const FundWalletController = require("./fundWalletByCard");

// methods
router.post(paths.initiateFund, FundWalletController.initiateFundingByCard);
router.post(paths.validateNigerianCards, FundWalletController.validateNigerianCards);
router.post(paths.validateForeignCards, FundWalletController.validateInternationalCards);
router.post(paths.validatePayment, FundWalletController.validatePayment);
router.post(paths.verifyPayment, FundWalletController.verifyPayment);


module.exports = router;
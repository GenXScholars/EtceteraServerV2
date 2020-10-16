const express = require("express");
const router = express.Router();
const paths = require("../../../paths/new-wallets-paths.js/walletsInDbPaths");
const WalletControllers = require("./walletsInDB");

// methods
router.get(paths.getAllWalletsFromDB, WalletControllers.getAllWalletsFromDB);
router.get(paths.getAWalletById, WalletControllers.getWalletInDBByid);
router.get(paths.getAWalletBalance, WalletControllers.getWalletBalanceInDB);
router.delete(paths.deleteAWallet, WalletControllers.deleteAWallet);

module.exports = router;
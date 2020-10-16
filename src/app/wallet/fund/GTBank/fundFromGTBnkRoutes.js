const express = require("express");
const router = express.Router();
const paths = require("../../../paths/fund-wallet/fundWalletFrmGTPaths");
const GTBnkController = require("./fundWalletFromGTBnk");

// methods
router.post(paths.initiateFund, GTBnkController.initiateFunding );
router.post(paths.validate, GTBnkController.validate );
router.post(paths.verify, GTBnkController.verify);



module.exports = router;
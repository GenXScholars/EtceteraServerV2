const express = require("express");
const router = express.Router();
const paths = require("../../../paths/fund-wallet/fundFromFirstBnkPaths");
const FirstBnkController = require("./fundWalletFromFirstBnk");

// methods
router.post(paths.initiateFund, FirstBnkController.initiateFunding  );
router.post(paths.validate, FirstBnkController.validate );
router.post(paths.verify, FirstBnkController.verify);



module.exports = router;
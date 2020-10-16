const express = require("express");
const router = express.Router();
const paths = require("../../paths/e-bills/IBEDCpaths");
const IBEDCController = require("./IBEDC");

// methods
router.post(paths.getAccountDetails, IBEDCController.getAccountDetails);
router.post(paths.getAllTransactionDetails, IBEDCController.getAllTransactionDetails);
router.post(paths.getDealerBalance, IBEDCController.getOurBalance);
router.post(paths.rechargeMeter, IBEDCController.rechargeMeter);

module.exports = router;
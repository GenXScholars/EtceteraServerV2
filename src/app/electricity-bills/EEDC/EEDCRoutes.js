const express = require('express');
const router = express.Router();
const paths = require("../../paths/e-bills/EEDCpath");
const EEDCController = require("./EEDC");

// methods
router.post(paths.getAccountDetails, EEDCController.getAccountDetails);
router.post(paths.getDealerBalance, EEDCController.getOurBalance);
router.post(paths.rechargeMeter, EEDCController.rechargeMeter);
router.post(paths.getSingletTransaction, EEDCController.getATransactionDetail);

module.exports = router;
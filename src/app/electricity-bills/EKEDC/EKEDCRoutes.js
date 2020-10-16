const express = require('express');
const router = express.Router();
const paths = require("../../paths/e-bills/EKEDCpaths");
const EKEDCController = require("./EKEDC");

// methods
router.post(paths.getAccountDetails, EKEDCController.getAccountDetails);
router.post(paths.getUserTransactions, EKEDCController.getAllTransactionDetail);
router.post(paths.getSingleTransaction, EKEDCController.getSingleTransactionDetail);
router.post(paths.getDealerBalance, EKEDCController.getOurBalance);
router.post(paths.rechargeMeter, EKEDCController.rechargeMeter);

module.exports = router;
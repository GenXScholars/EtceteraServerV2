const express = require("express");
const router = express.Router();
const paths = require("../../paths/cable-tv/dstvRecharge");
const DSTVController = require('./dstv');

// methods
router.post(paths.ngGetSingleTransaction, DSTVController.getSingleTransaction);
router.post(paths.ngDSTVRecharge, DSTVController.recharge);
router.post(paths.monthlylyRecurring, DSTVController.getMonthlyRecharge);
router.post(paths.ngBulkRecharge, DSTVController.rechargeBulk);
router.post(paths.AmountForAProduct, DSTVController.getAmountForAProduct);
router.post(paths.ngValidate, DSTVController.validate);



module.exports = router;
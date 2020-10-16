const express = require("express");
const router = express.Router();
const paths = require("../paths/mobile-recharge/mobile_ng_recharge");
const ngAirtimeController = require("./mobile_ng_recharge");

// methods
router.get(paths.getAllRecurringSubscribers, ngAirtimeController.getAllRecurringSubscribers);
router.post(paths.getAlAvailableBills, ngAirtimeController.getAllAvailableBills);
router.post(paths.ngCancelrecurring, ngAirtimeController.cancelRecurringRecharge);
router.post(paths.ngAirtimeRecharge, ngAirtimeController.rechargeOneTimeAirtime);
router.post(paths.ngStatusOfBill, ngAirtimeController.getStatusOfBill);
router.post(paths.ngBulkRecharge, ngAirtimeController.rechargeBulkAirtime);
router.post(paths.ngGetAllTransactions, ngAirtimeController.getAllTransactions);
router.post(paths.hourlyRecurring, ngAirtimeController.getHourlyRecharge);
router.post(paths.daillyRecurring, ngAirtimeController.getDailyRecharge);
router.post(paths.weeklyRecurring, ngAirtimeController.getWeeklyRecharge);
router.post(paths.monthlylyRecurring, ngAirtimeController.getMonthlyRecharge);
router.post(paths.ngGetAmountForAProduct, ngAirtimeController.getAmountForAProduct);




module.exports = router;
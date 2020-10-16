const express = require("express");
const router = express.Router();
const paths = require("../paths/payment/guestPaymentPaths");
const GuestPaymentController = require('./guestPayment');

// methods
router.post(paths.guestPayment, GuestPaymentController.initiatePayment);
router.post(paths.verifyGuestPayment, GuestPaymentController.verify);


module.exports = router;
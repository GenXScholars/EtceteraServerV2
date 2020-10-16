const express = require('express');
const router = express.Router();
const paths = require("../paths/atm-cards/creditCardsApiPaths");
const CreditCardsController = require('./cards');

// methods
router.post(paths.creatACreditCard, CreditCardsController.create);
router.get(paths.getAllCreditCards, CreditCardsController.getAllCreditCards);
router.get(paths.getSingleCreditCards, CreditCardsController.getByCardId);9
router.put(paths.updateCreditCard, CreditCardsController.updateCardInfo);
router.delete(paths.deleteACreditCard, CreditCardsController.deleteCard);

module.exports = router;
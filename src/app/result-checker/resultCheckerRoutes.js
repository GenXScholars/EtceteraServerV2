const express = require("express");
const router = express.Router();
const paths = require("../paths/edu-results/resultCheckPath");
const RsltCheckerController = require('./resultChecker');

// methods
router.post(paths.checkResult, RsltCheckerController.checkresult );
router.get(paths.getOurBalance, RsltCheckerController.getOurBalance);

module.exports = router;
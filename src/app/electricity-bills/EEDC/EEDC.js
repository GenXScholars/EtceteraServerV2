const config = require("../../../config/constants");
const EEDCService = require("./EEDCServices");
const transactions = require("../../shared/notifications/transactionMail");
const debug = require("debug")("app:EEDCControllers");

function getAccountDetails(req, res, next){
    EEDCService.FetchCust(req.body)
    .then((result)=>{
        // transactions.sendDebitTransaction(data);
      debug(result);
        res.json({
            message:`your details was retrieved succesfully`,
            
        })
    }).catch(err => next(err))
}

function getOurBalance(req, res, next){
    EEDCService.getDealerBalance(req.body)
    .then((result)=>{
        res.json({
            message:`EEDC balance retrieved succesfuly`,
            result
        })
    }).catch(err => next(err))
}

function getATransactionDetail(req, res, next){
    EEDCService.FetchTxnByRef(req.body)
    .then((result)=>{
        res.json({
            message:``,
            result
        })
    }).catch(err => next(err))
}

function rechargeMeter(req, res, next){
    EEDCService.postTransaction(req.body)
    .then((result)=>{
       res.json({
           message:`EEDC bill purchased succesfully`,
           result
       })
    }).catch(err => next(err))
}


module.exports = {
    getAccountDetails,
    getOurBalance,
    getATransactionDetail,
    rechargeMeter
}
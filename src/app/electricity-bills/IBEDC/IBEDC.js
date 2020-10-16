var parseString = require('xml2js').parseString;
const config = require("../../../config/constants");
const IBEDCService = require("./IBEDCServices");
const transactions = require("../../shared/notifications/transactionMail");
const bcrypt = require("bcryptjs");

function getAccountDetails(req, res, next){
    IBEDCService.FetchCust(req.body)
    .then((result)=>{
        const data = result.data.Data;
        // transactions.sendDebitTransaction(data);
        parseString(xml, function (err, result) {
            console.dir(result);
        });
        res.json({
            message:`your details was retrieved succesfully`,
            data
        })
    }).catch(err => next(err))
}

function getOurBalance(req, res, next){
    IBEDCService.getDealerBalance(req.body)
    .then((result)=>{
        res.json({
            message:`IBEDC balance retrieved succesfuly`,
            result
        })
    }).catch(err => next(err))
}

function getAllTransactionDetails(req, res, next){
    IBEDCService.FetchUsage(req.body)
    .then((result)=>{
        res.json({
            message:`All your transaction details succesfully retrieved`,
            result
        })
    }).catch(err => next(err))
}

function rechargeMeter(req, res, next){
    IBEDCService.postTransaction(req.body)
    .then((result)=>{
       res.json({
           message:`IBEDC bill purchased succesfully`,
           result
       })
    }).catch(err => next(err))
}


module.exports = {
    getAccountDetails,
    getOurBalance,
    getAllTransactionDetails,
    rechargeMeter
}
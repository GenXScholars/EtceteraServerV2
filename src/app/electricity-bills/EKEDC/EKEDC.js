const EKEDCService = require("./EKEDCServices");
const transactions = require("../../shared/notifications/transactionMail");
const debug = require("debug")("app:EKEDCControllers");

function getAccountDetails(req, res, next){
    EKEDCService.FetchCust_New(req.body)
    .then((result)=>{
        const data = result.data.Data;
        // transactions.sendDebitTransaction(data);
        res.json({
            message:`your details was retrieved succesfully`,
            data
        })
    }).catch(err => next(err))
}

function getOurBalance(req, res, next){
    EKEDCService.getDealerBalance(req.body)
    .then((result)=>{
        res.json({
            message:`EKEDC balance retrieved succesfuly`,
            result
        })
    }).catch(err => next(err))
}

function getAllTransactionDetail(req, res, next){
    EKEDCService.FetchUsage(req.body)
    .then((result)=>{
        res.json({
            message:`All transctions retrieved succesfully`,
            result
        })
    }).catch(err => next(err))
}

function rechargeMeter(req, res, next){
    //  note (1= prepaid, 0= postpaid)
    EKEDCService.PostTransaction_New(req.body)
    .then((result)=>{
       res.json({
           message:`EKEDC bill purchased succesfully`,
           result
       })
    }).catch(err => next(err))
}

function getSingleTransactionDetail(req, res, next){
    EKEDCService.FetchTnxByRef(req.body)
    .then((result) => {
        res.json({
            message: `trabsaction with ref id... was retrieved succesfully`,
            result
        })
         
    })
    .catch(err => next(err))
}

module.exports = {
    getAccountDetails, 
    getOurBalance, 
    getAllTransactionDetail,
    getSingleTransactionDetail,
    rechargeMeter
}
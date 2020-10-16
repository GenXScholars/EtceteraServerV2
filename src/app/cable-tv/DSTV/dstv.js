const DSTVService = require("./dstvServices");
const transactions = require("../../shared/notifications/billsMail");
const debug = require("debug")("app:DSTVControllers");

function recharge(req, res, next){
    DSTVService.rechargeOneTime(req.body)
    .then((result)=>{
        debug(result)
        debug("DSTV RECHARGE DATA: " + " "+ result);
        const data = result.data;
        const status = result.statusText
        // transactions.sendDebitTransaction(data);
        res.json({
            message:"you have recharged your dstv succesfully",
            status,
            data
        })
    }).catch(err => next(err))
}

function  rechargeBulk(req, res, next){
    DSTVService.rechargeBulk(req.body)
    .then((result)=>{
        const data = result.data;
        const status = result.statusText
        debug("DSTV BULK DATA :" + " " + result);
        res.json({
            message:"Your bulk recharge waws succesful",
            status,
            data
        })
    }).catch(err => next(err))
}

function getSingleTransaction(req, res, next){
    //  note (1= prepaid, 0= postpaid)
      DSTVService.getSingleTransaction(req.body)
    .then((result)=>{
        debug("single transaction DATA" + " " + result);
        const data = result.data;
        const status = result.statusText
       res.json({
           message:"Your single transaction data was retrieved succesfully",
           status,
           data
       })
    }).catch(err => next(err))
}

function getMonthlyRecharge(req, res, next){
    DSTVService.getMonthlyRecharge(req.body)
    .then((result) => {
        debug("Monthly recharge DATA" + " " + result);
        const data = result.data;
        const status = result.statusText
        res.json({
            message: "Your monthly recharge was successful",
            status,
            data
        })
         
    })
    .catch(err => next(err))
}

function getAmountForAProduct(req, res, next){
    DSTVService.getAmountForAProduct(req.body)
    .then((result) => {
        debug("Amount for a product DATA" + " " + result);
        const data = result.data;
        const status = result.statusText
        res.json({
            message: "The amount for a product was succesfully retrieved",
            status,
            data
        })
         
    })
    .catch(err => next(err))
}

function  validate(req, res, next){
    DSTVService.validate(req.body)
    .then((result) => {
        debug("Validate DATA" + " " + result);
        const data = result.data;
        const status = result.statusText
        res.json({
            message: "Your smart card number was validated succesfully",
            status,
            data
        })
         
    })
    .catch(err => next(err))
}
module.exports = {
    recharge,
    rechargeBulk,
    getSingleTransaction,
    getMonthlyRecharge,
    getAmountForAProduct,
    validate
  };
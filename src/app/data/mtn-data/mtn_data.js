const MtnDataService = require("./mtn_dataServices");
const transactions = require("../../shared/notifications/transactionMail");
const debug = require("debug")("app:MTNControllers");


function   rechargeOneTimeAirtime(req, res, next){
    MtnDataService.rechargeOneTimeData(req.body)
    .then((result)=>{
        debug("RECHARGE ONE TIME DATA :" + " " + result);
        res.json({
            message:"You have succesfully recharged one time",
            result
        })
    }).catch(err => next(err))
}


function   rechargeBulkAirtime(req, res, next){
      MtnDataService.rechargeBulkData(req.body)
    .then((result)=>{
        debug("Data BULK:" + " " + result);
        res.json({
            message:"Your bulk recharge waws succesful",
            result
        })
    }).catch(err => next(err))
}

function getSingleTransaction(req, res, next){
    //  note (1= prepaid, 0= postpaid)
      MtnDataService.getSingleTransaction(req.body)
    .then((result)=>{
        debug("single transaction " + " " + result);
       res.json({
           message:"Your single transaction data was retrieved succesfully",
           result
       })
    }).catch(err => next(err))
}

function getHourlyRecharge(req, res, next){
    MtnDataService.getHourlyRecharge(req.body)
    .then((result) => {
        debug("Hourly recharge" + " " + result);
        res.json({
            message: "Your hourly recharge was successful",
            result
        })
         
    })
    .catch(err => next(err))
}

function getDailyRecharge(req, res, next){
    MtnDataService.getDailyRecharge(req.body)
    .then((result) => {
        debug("Daily recharge" + " " + result);
        res.json({
            message: "Your daily recharge was successful",
            result
        })
         
    })
    .catch(err => next(err))
}

function getWeeklyRecharge(req, res, next){
    MtnDataService.getWeeklyRecharge(req.body)
    .then((result) => {
        debug("Weekly recharge" + " " + result);
        res.json({
            message: "Your weekly recharge was successful",
            result
        })
         
    })
    .catch(err => next(err))
}

function getMonthlyRecharge(req, res, next){
    MtnDataService.getMonthlyRecharge(req.body)
    .then((result) => {
        debug("Monthly recharge:" + " " + result);
        res.json({
            message: "Your monthly recharge was successful",
            result
        })
         
    })
    .catch(err => next(err))
}

function getAmountForAProduct(req, res, next){
    MtnDataService.getAmountForAProduct(req.body)
    .then((result) => {
        debug("Amount for a product" + " " + result);
        res.json({
            message: "The amount for a product was succesfully retrieved",
            result
        })
         
    })
    .catch(err => next(err))
}

module.exports = {
    rechargeOneTimeAirtime,
    rechargeBulkAirtime,
    getSingleTransaction,
    getHourlyRecharge,
    getDailyRecharge,
    getWeeklyRecharge,
    getMonthlyRecharge,
    getAmountForAProduct
  };
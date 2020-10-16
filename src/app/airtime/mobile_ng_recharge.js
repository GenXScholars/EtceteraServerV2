const AirtimeService = require("./airtimeServices");
const transactions = require("../shared/notifications/transactionMail");
const debug = require("debug")("app:AirtimeControllers");


// controllers for all bills(DSTV< AIRTIME < DATA) start.......///////

function cancelRecurringRecharge(req, res, next){
    AirtimeService.cancelRecurringRecharge(req.body)
    .then((result)=>{
        debug("Recurring RECHARGE: " + " "+ result);
        const data = result.data.Data;
        // transactions.sendDebitTransaction(data);
        res.json({
            message:"you have canceled all recurring recharge",
            data
        })
    }).catch(err => next(err))
}

function getAllAvailableBills(req, res, next){
    AirtimeService.getAllAvailableBills(req.body)
    .then((result)=>{
        debug("AVAILABLE BIILS DATA: " + " "+ result);
        const data = result.data.Data;
        // transactions.sendDebitTransaction(data);
        res.json({
            message:"you have succesfully retrieved all available bills",
            data
        })
    }).catch(err => next(err))
}

function getAllRecurringSubscribers(req, res, next){
    AirtimeService.getAllRecurringSubscribers(req.body)
    .then((result)=>{
         debug("RECURRING SUBSCRIBERS DATA" + " " + result);
        res.json({
            message:"All recurring subscribers retrieved succesfully",
            result
        })
    }).catch(err => next(err))
}

function getStatusOfBill(req, res, next){
    AirtimeService.getStatusOfBill(req.body)
    .then((result)=>{
         debug("STATUS OF BILL DATA" + " " + result);
        res.json({
            message:"The status of a bill retrieved succesfully",
            result
        })
    }).catch(err => next(err))
}


function getAllTransactions(req, res, next){
     AirtimeService.getAllTransactions(req.body)
    .then((result)=>{
         debug("ALL TRANSACTIONS DATA" + " " + result);
        res.json({
            message:"All your transaction was retrieved succesfully",
            result
        })
    }).catch(err => next(err))
}

// controller for all bills end................./////





// controllers unique to airtime start here
function   rechargeOneTimeAirtime(req, res, next){
    AirtimeService.rechargeOneTimeAirtime(req.body)
    .then((result)=>{
        debug("RECHARGE ONE TIME DATA :" + " " + result);
        res.json({
            message:"You have succesfully recharged one time",
            result
        })
    }).catch(err => next(err))
}


function   rechargeBulkAirtime(req, res, next){
     AirtimeService.rechargeBulkAirtime(req.body)
    .then((result)=>{
        debug("AIRTIME BULK:" + " " + result);
        res.json({
            message:"Your bulk recharge waws succesful",
            result
        })
    }).catch(err => next(err))
}

function getSingleTransaction(req, res, next){
    //  note (1= prepaid, 0= postpaid)
      AirtimeService.getSingleTransaction(req.body)
    .then((result)=>{
        debug("single transaction " + " " + result);
       res.json({
           message:"Your single transaction data was retrieved succesfully",
           result
       })
    }).catch(err => next(err))
}

function getHourlyRecharge(req, res, next){
    AirtimeService.getHourlyRecharge(req.body)
    .then((result) => {
        debug("Hourly recharge DATA" + " " + result);
        res.json({
            message: "Your hourly recharge was successful",
            result
        })
         
    })
    .catch(err => next(err))
}

function getDailyRecharge(req, res, next){
    AirtimeService.getDailyRecharge(req.body)
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
    AirtimeService.getWeeklyRecharge(req.body)
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
    AirtimeService.getMonthlyRecharge(req.body)
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
    AirtimeService.getAmountForAProduct(req.body)
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
    cancelRecurringRecharge,
    getAllRecurringSubscribers,
    getStatusOfBill,
    getAllTransactions,
    getAllAvailableBills,
    rechargeOneTimeAirtime,
    rechargeBulkAirtime,
    getSingleTransaction,
    getHourlyRecharge,
    getDailyRecharge,
    getWeeklyRecharge,
    getMonthlyRecharge,
    getAmountForAProduct
  };
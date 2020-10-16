const axios = require("axios").default;
const apiUrl = "https://api.ravepay.co/v2/services/confluence"; // to be changed for production

const SecretKey = require("../../config/constants").FlutterWaveSecretKey;
const PubicKey = require("../../config/constants").FlutterwavePubicKey;

//axios config
const axiosCall = axios.create({
  baseURL: apiUrl
});



async function getAllAvailableBills(passedBodyParams) {
 
  return await axiosCall.post("", {
      "secret_key": SecretKey,
      "service": "bills_categories",
      "service_method": "get",
      "service_version": "v1",
      "service_channel": "rave",
      "service_payload": ""
    
  }) 
   
}

async function rechargeOneTimeAirtime(passedBodyParams) {
  const { phoneNumber, refId, Amount, country } = passedBodyParams;
  return await axiosCall.post("",
  {
    "secret_key": SecretKey,
    "service": "fly_buy",
    "service_method": "post",
    "service_version": "v1",
    "service_channel": "rave",
    "service_payload": {
      "Country": "NG",
      "CustomerId": "+23490803840303",
      "Reference": "9300049404444",
      "Amount": 500,
      "RecurringType": 0,
      "IsAirtime": true,
      "BillerName": "AIRTIME"
    }
  }) 

}


async function  rechargeBulkAirtime(passedBodyParams){
  return await axiosCall.post("",
  {
    "secret_key": SecretKey,
    "service": "fly_buy_bulk",
    "service_method": "post",
    "service_version": "v1",
    "service_channel": "rave",
    "service_payload": {
      "BatchReference": "batch-rave-150928302799933922",
      "CallBackUrl": "https://rave-webhook.herokuapp.com/newregistration",
      "Requests": [
        {
          "Country": "NG",
          "CustomerId": "+23490803840303",
          "Amount": 500,
          "RecurringType": 0,
          "IsAirtime": true,
          "BillerName": "AIRTIME",
          "Reference": "9300049404444"
        },
        {
          "Country": "GH",
          "CustomerId": "+233276081163",
          "Amount": 10,
          "RecurringType": 0,
          "IsAirtime": true,
          "BillerName": "AIRTIME",
          "Reference": "9300049405555"
        },
        {
          "Country": "US",
          "CustomerId": "+190830030",
          "Amount": 20,
          "RecurringType": 0,
          "IsAirtime": true,
          "BillerName": "AIRTIME",
          "Reference": "9300049406666"
        }
      ]
    }
  })
     
}

async function  getAllRecurringSubscribers(passedBodyParams){
  return await axiosCall.get("",
  {
    "secret_key": "FLWSECK-e6db11d1f8a6208de8cb2f94e293450e-X",
    "service": "fly_recurring",
    "service_method": "get",
    "service_version": "v1",
    "service_channel": "rave"
  }) 

 
}



async function  getAllTransactions(passedBodyParams){
  return await axiosCall.post("",
  {
    "secret_key": "FLWSECK-e6db11d1f8a6208de8cb2f94e293450e-X",
    "service": "fly_history",
    "service_method": "post",
    "service_version": "v1",
    "service_channel": "rave",
    "service_payload": {
      "FromDate": "2018-08-01",
      "ToDate": "2018-08-27",
      "PageSize": 20,
      "PageIndex": 0,
      "Reference": "+233494850059" // not needed for all transactions retrieval
    }
  }) 

 
}

async function  getSingleTransaction(passedBodyParams){
  return await axiosCall.post("",
  {
    "secret_key": "FLWSECK-e6db11d1f8a6208de8cb2f94e293450e-X",
    "service": "fly_history",
    "service_method": "post",
    "service_version": "v1",
    "service_channel": "rave",
    "service_payload": {
      "FromDate": "2018-08-01",
      "ToDate": "2018-08-27",
      "PageSize": 20,
      "PageIndex": 0,
      "Reference": "+233494850059" //needed for this endpoint
    }
  }) 

 
}


async function  getStatusOfBill(passedBodyParams){
  return await axiosCall.post("/fly_requery",
  {
    "secret_key": "FLWSECK-e6db11d1f8a6208de8cb2f94e293450e-X",
    "service": "fly_requery_9300049404444",// Prefix "fly_requery_" plus your transaction reference.
    "service_method": "get",
    "service_version": "v1",
    "service_channel": "rave"
  })
}
async function getHourlyRecharge(passedBodyParams) {
  return await axiosCall.post("",
  {
    "secret_key": SecretKey,
    "service": "fly_buy",
    "service_method": "post",
    "service_version": "v1",
    "service_channel": "rave",
    "service_payload": {
      "Country": "NG",
      "CustomerId": "+23490803840303",
      "Reference": "9300049404444",
      "Amount": 500,
      "RecurringType": 1,  //value for hourly recharge
      "IsAirtime": true,
      "BillerName": "AIRTIME"
    }
  }) 

 
}
async function getDailyRecharge(passedBodyParams) {
  return await axiosCall.post("",
  {
    "secret_key": SecretKey,
    "service": "fly_buy",
    "service_method": "post",
    "service_version": "v1",
    "service_channel": "rave",
    "service_payload": {
      "Country": "NG",
      "CustomerId": "+23490803840303",
      "Reference": "9300049404444",
      "Amount": 500,
      "RecurringType": 2, //for daily payment
      "IsAirtime": true,
      "BillerName": "AIRTIME"
    }
  }) 

 

}

async function getWeeklyRecharge(passedBodyParams) {
  return await axiosCall.post("",
  {
    "secret_key": SecretKey,
    "service": "fly_buy",
    "service_method": "post",
    "service_version": "v1",
    "service_channel": "rave",
    "service_payload": {
      "Country": "NG",
      "CustomerId": "+23490803840303",
      "Reference": "9300049404444",
      "Amount": 500,
      "RecurringType": 3,  // weekly recharge number
      "IsAirtime": true,
      "BillerName": "AIRTIME"
    }
  }) 

 
 
}

async function getMonthlyRecharge(passedBodyParams) {
  return await axiosCall.post("",
  {
    "secret_key": SecretKey,
    "service": "fly_buy",
    "service_method": "post",
    "service_version": "v1",
    "service_channel": "rave",
    "service_payload": {
      "Country": "NG",
      "CustomerId": "+23490803840303",
      "Reference": "9300049404444",
      "Amount": 500,
      "RecurringType": 4, // for monthly payment
      "IsAirtime": true,
      "BillerName": "AIRTIME"
    }
  }) 

 
}

async function cancelRecurringRecharge(passedBodyParams) {
  return await axiosCall.post("",
  {
    "secret_key": "FLWSECK-e6db11d1f8a6208de8cb2f94e293450e-X",
    "service": "fly_recurring_cancel",
    "service_method": "post",
    "service_version": "v1",
    "service_channel": "rave",
    "service_payload": {
        "CustomerMobile": "+23481056829830", //mobile number or dstv number
        "RecurringPayment": 383 //Id of the recurring payment to be cancelled.
    }
}) 

 
}

async function getAmountForAProduct(passedBodyParams) {
  return await axiosCall.post("",
  {
    "secret_key": "FLWSECK-e6db11d1f8a6208de8cb2f94e293450e-X",
    "service": "fly_remita_biller_lookup_BIL136_OT151",
    "service_method": "get",
    "service_version": "v1",
    "service_channel": "rave"
  })
}

module.exports = {
  getAllAvailableBills,
  rechargeOneTimeAirtime,
  rechargeBulkAirtime,
  getAllRecurringSubscribers,
  getAllTransactions,
  getSingleTransaction,
  getStatusOfBill,
  getHourlyRecharge,
  getDailyRecharge,
  getWeeklyRecharge,
  getMonthlyRecharge,
  cancelRecurringRecharge,
  getAmountForAProduct
};
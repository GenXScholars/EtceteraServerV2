const axios = require("axios").default;
const apiUrl = "https://api.ravepay.co/v2/services/confluence"; // to be changed for production

//import secret/publickeys

const SecretKey = require("../../../config/constants").FlutterWaveSecretKey;
const PubicKey = require("../../../config/constants").FlutterwavePubicKey;

//axios config
const axiosCall = axios.create({
  baseURL: apiUrl
});


async function rechargeOneTimeData(passedBodyParams) {
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


async function  rechargeBulkData(){
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


async function  getSingleTransaction(){
  
}

async function getHourlyRecharge(passedBodyParams) {
 
}


async function getDailyRecharge(passedBodyParams) {
  

}

async function getWeeklyRecharge(passedBodyParams) {
 
 
}

async function getMonthlyRecharge(passedBodyParams) {
 
}





async function getAmountForAProduct(passedBodyParams) {
  return await axiosCall.post("/fly_remita_biller_lookup_{BillerID}_{ProductID}",
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

module.exports = {
  rechargeOneTimeData,
  rechargeBulkData,
  getSingleTransaction,
  getHourlyRecharge,
  getDailyRecharge,
  getWeeklyRecharge,
  getMonthlyRecharge,
  getAmountForAProduct
};
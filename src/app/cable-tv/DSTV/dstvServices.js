const axios = require("axios").default;
const apiUrl = "https://api.ravepay.co/v2/services/confluence"; // to be changed for production

//import secret/publickeys

const SecretKey = require("../../../config/constants").FlutterWaveSecretKey;
const PubicKey = require("../../../config/constants").FlutterwavePubicKey;

//axios config
const axiosCall = axios.create({
  baseURL: apiUrl
});


async function rechargeOneTime(passedBodyParams) {
  // if(!passedBodyParams.amount){
  //   throw "You must enter an amount"
  // }
  const { amount, SmartCardNumber } = passedBodyParams;
  return await axiosCall.post("",
  {
    "secret_key": "FLWSECK_TEST-c87625893dd1c07a03fc8162a7e24a06-X",
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
      "IsAirtime": false,
      "BillerName": "DSTV"
    }
  }) 

}

async function  rechargeBulk(){
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
          "CustomerId": "+23490803840303", // smart card number here
          "Amount": 500,
          "RecurringType": 0,
          "IsAirtime": false,
          "BillerName": "DSTV",
          "Reference": "9300049404444"
        },
        {
          "Country": "GH",
          "CustomerId": "+233276081163", // smart card number here
          "Amount": 10,
          "RecurringType": 0,
          "IsAirtime": false,
          "BillerName": "DSTV",
          "Reference": "9300049405555"
        },
        {
          "Country": "US",
          "CustomerId": "+190830030",
          "Amount": 20,
          "RecurringType": 0,
          "IsAirtime": false,
          "BillerName": "DSTV",
          "Reference": "9300049406666"
        }
      ]
    }
  })
     
}

async function  getAllTransactions(){
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

async function  getSingleTransaction(){
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
      "CustomerId": "+23490803840303", //smart card number
      "Reference": "9300049404444",
      "Amount": 500,
      "RecurringType": 4, // for monthly payment
      "IsAirtime": false,
      "BillerName": "DSTV"
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

async function validate(passedBodyParams) {
  return await axiosCall.post("",
  {
    "secret_key": "FLWSECK-e6db11d1f8a6208de8cb2f94e293450e-X",
    "service": "bills_validate_CB140_BIL119_1025401152", // codes to b passed here
    "service_method": "get",
    "service_version": "v1",
    "service_channel": "rave"
  })
}

module.exports = {
  rechargeOneTime,
  rechargeBulk,
  getAllTransactions,
  getSingleTransaction,
  getMonthlyRecharge,
  getAmountForAProduct,
  validate
};
const debug = require("debug");
const Wallet = require("../models/walletModel");
const axios = require("axios").default;

//import secret/publickeys
const SecKEY = require("../../config/constants").FlutterWaveSecretKey;
const PubKEY = require("../../config/constants").FlutterwavePubicKey;


// axios verify config

const apiUrlV = "https://api.ravepay.co/flwv3-pug/getpaidx/api/v2";  // production endpoint
     const axiosVerify = axios.create({
        baseURL: apiUrlV,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${SecKEY}`,  
          }
      });

const apiUrl = "https://api.flutterwave.com/v3"; // to be changed for production

//axios config for initiate payment
const axiosInitiate = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${SecKEY}`,  
  }
});

async function initiateGuestPayment(passedBodyParams) {
   //validate input parameters
  if(passedBodyParams){
    // get a hold of the body params
    const {  amount, email, phonenumber, name, transactionRef  } = passedBodyParams;
    return await axiosInitiate.post(`/payments`, 
    {
        "tx_ref":transactionRef,
        "amount":amount,
        "currency":"NGN",
        "redirect_url":"https://webhook.site/9d0b00ba-9a69-44fa-a43d-a82c33c36fdc",
        "payment_options":"card",
        "meta":{
           "consumer_id":23,
           "consumer_mac":"92a3-912ba-1192a"
        },
        "customer":{
           "email":email,
           "phonenumber":phonenumber,
           "name":name
        },
        "customizations":{
           "title":"VineBill Payments",
           "description":"Pay for Servies",
           "logo":"https://assets.piedpiper.com/logo.png"
        }
     })  
  }
}

async function verifyGuestPayment(results, req){  
    return await axiosVerify.post("/verify", {
        "txref":results.data.txref, // transact refrence from innitiate payment
        "SECKEY":SecKEY // merchant secret key
      })  
  
}
module.exports = {
    initiateGuestPayment,
    verifyGuestPayment
};
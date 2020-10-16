const debug = require("debug");
const Wallet = require("../../../models/walletModel");
const axios = require("axios").default;

//import secret/publickeys

const SecKEY = require("../../../../config/constants").FlutterWaveSecretKey;
const PubKEY = require("../../../../config/constants").FlutterwavePubicKey;

// axios config for  verify endpoint

const options = {
  url: "",
  method: "",
  headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
  },
  body: {
    "PBFPubKey": "",  // merchant public key goes here
    "transaction_reference": "", 
    "otp": ""
  }
}

// import gateway class

const Rave = require("../config/gatewayConstants").Rave;
                             //public key                              // secretkey
const rave = new Rave('FLWPUBK-ba0a57153f497c03bf34a9e296aa9439-X','FLWSECK-327b3874ca8e75640a1198a1b75c0b0b-X');

async function initiateGTBnk(passedBodyParams) {
   //validate input parameters
  if(passedBodyParams){
    // get a hold of the body params
    const { accountnumber, currency, amount, email, DateOfBirth, bvn,  phonenumber, firstname, lastname, IP  } = passedBodyParams;
      return await rave.initiatePayment({
            "PBFPubKey": PubKEY,
            "accountbank": "058",// get the bank code from the bank list endpoint.
            "accountnumber": accountnumber,
            "currency": currency,
            "payment_type": "account",
            "country": "NG",
            "amount": amount,
            "email": email,
            "passcode": DateOfBirth,//customer Date of birth this is required for Zenith bank account payment.
            "bvn": bvn,
            "phonenumber": phonenumber,
            "firstname": firstname,
            "lastname": lastname,
            "IP": IP,
            "txRef": "MC-0292920", // merchant unique reference
             "redirect_url":"" //url to be provided to redirect users after transaction
        });
  }
}

async function validateGTBnk(passedBodyParams){
 // function to redirect user to new window to open GT bank services
}

async function verifyGTBnk(results, req){
  if(results.status === "success" && results.txt.currency === req.body.currency){
    const apiUrl = "https://api.ravepay.co/flwv3-pug/getpaidx/api/v2";  // production endpoint
     const axiosVerify = axios.create({
        baseURL: apiUrl,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
    return await axiosVerify.post("/verify", {
        "txref":results.data.txref, // transact refrence from innitiate payment
        "SECKEY":SecKEY // merchant secret key
      })  
  }
}
module.exports = {
    initiateGTBnk,
    validateGTBnk,
    verifyGTBnk
};
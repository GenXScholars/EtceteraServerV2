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

async function initiateAccessBnk(passedBodyParams) {
   //validate input parameters
  if(passedBodyParams){
    // get a hold of the body params
    const { accountnumber, currency, amount, email, DateOfBirth, bvn,  phonenumber, firstname, lastname, IP  } = passedBodyParams;
      return await rave.initiatePayment({
            "PBFPubKey": PubKEY,
            "accountbank": "044",// get the bank code from the bank list endpoint.
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
      });
  }
}

async function validateAccessBank(passedBodyParams){
  if(passedBodyParams){
    const { transaction_reference, otp} = passedBodyParams;
    const passedParams = Object.assign({}, options);
    passedParams.url = "https://api.ravepay.co/flwv3-pug/getpaidx/api/validate";
    passedParams.method = "POST";
    passedParams.body.PBFPubKey = PubKEY; // set public key
    passedParams.body.transactionreference = results.data.flwRef; // transaction reference
    passedParams.body.otp = otp;
    passedParams.body.use_access = "true";
return  await axios.create({passedBodyParams});
  }
}

async function verifyAccessBnk(results, req){
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
    initiateAccessBnk,
    validateAccessBank,
    verifyAccessBnk
};
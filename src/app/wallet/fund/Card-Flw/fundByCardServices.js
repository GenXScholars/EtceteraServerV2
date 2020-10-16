const debug = require("debug")("app:FCARDSERVICES");
const Wallet = require("../../../models/walletModel");
const axios = require("axios").default;

//import secret/publickeys

const SecretKey = require("../../../../config/constants").FlutterWaveSecretKey;
const PubicKey = require("../../../../config/constants").FlutterwavePubicKey;


   // params for test 
   let flightID = "123949494DC",
   cardno ="5531886652142950",
   cvv = " 564",
   expirymonth = "09",
   expiryyear = "22",
   currency = "NGN",
   amount = "100",
   country = "NG",
   phonenumber ="08162968926",
   email = "user@flw.com",
   firstname = "Ogaga",
   lastname = "Adjaro",
   IP = "",
   tnxf = "MC-3243e";


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

const Rave = require("../../../../config/gatewayConstants").Rave;
                             //public key                              // secretkey
const rave = new Rave(PubicKey, SecretKey);

async function initiateCardFunding(passedBodyParams) {
   //validate input parameters
  
    // get a hold of the body params
    // const { cardno, cvv, expirymonth, expiryyear, currency, country, amount, email, phonenumber, firstname, lastname, IP  } = passedBodyParams;
    debug()
    const payment =  await rave.initiatePayment({
        "PBFPubKey": PubicKey, //merchant pub key
        "cardno": cardno,
        "cvv": cvv,
        "expirymonth": expirymonth, // example 09
        "expiryyear": expiryyear, // example 20
        "currency": currency,
        "country": country,
        "amount": amount,
        "email": email,
        "phonenumber": phonenumber,
        "firstname": firstname,
        "lastname": lastname,
        "IP": IP,
        "txRef": "MC-" + Date.now(),// your unique merchant reference
        "meta": [{metaname: "flightID", metavalue: flightID}],
        "redirect_url": "https://rave-webhook.herokuapp.com/receivepayment",
        "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
      });
  
}

async function validateCardsWithPins(passedBodyParams){
  // this endpoint is for when the returned data.suggested_auth === pin
  const { cardno, cvv, expirymonth, expiryyear, currency, country, amount, email, phonenumber, firstname, lastname, IP, PIN  } = passedBodyParams;

  if(passedBodyParams){
        return  await rave.initiatePayment({
          "PBFPubKey": PubicKey, //merchasnt public key
          "cardno": cardno,
          "cvv": cvv,
          "expirymonth": expirymonth, // example 09
          "expiryyear": expiryyear,  //example 19
          "currency": currency,
          "pin": PIN,  //added at this level of validation card pin
          "country": country,
          "amount": amount,
          "email": email,
          "suggested_auth": "PIN",
          "phonenumber": phonenumber,
          "firstname": firstname,
          "lastname": lastname,
          "IP": IP,
          "txRef": "MC-" + Date.now(),
          "redirect_url": "https://rave-webhook.herokuapp.com/receivepayment", // TODO == change url
          "meta": [{metaname: "flightID", metavalue: ""}],
          "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
      })   
  }
}

async function validateInternatinalCards(passedBodyParams){
  // this endpoi nt is used wen the suggested auth returned is NOAUTH_INTERNATIONAL
  if(passedBodyParams){

    // const { cardno, cvv, expirymonth, expiryyear, currency, country, amount, email, phonenumber, firstname, lastname, IP, billingzip, billingcity, billingaddress, billingstate, billingcountry } = passedBodyParams;
        return await rave.initiatePayment({
          "PBFPubKey": PubicKey, //merchant pub key
          "cardno": cardno,  // verve and master card only
          "cvv":   cvv,           //example "828",
          "expirymonth": expirymonth,        //example "09",
          "expiryyear": expiryyear,     //example  "19",
          "currency": currency,
          "country": country,
          "amount": amount,
          "email": email,
          "phonenumber": phonenumber,
          "firstname": firstname,
          "lastname": lastname,
          "IP": IP,
          "txRef": "MC-" + Date.now(),
          "meta": [{metaname: "flightID", metavalue: "123949494DC"}],
          "suggested_auth": "AVS_VBVSECURECODE"/ "NOAUTH_INTERNATIONAL",
          "billingzip":billingzip,           // example "07205",                                 // to be added at this level
          "billingcity": billingcity,           //example "Hillside",                             // to be added at this level
          "billingaddress": billingaddress,         //example "470 Mundet PI",                     // to be added at this level
          "billingstate": billingstate,           //example "NJ",                                  // to be added at this level
          "billingcountry": billingcountry,            //example "US",                                // to be added at this level
          "redirect_url": "https://rave-webhook.herokuapp.com/receivepayment",
          "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
      })
    }
}

// validate the payment for both scenarios i.e local cards and international card
async function validatePayment(passedBodyParams){
  if(passedBodyParams){
    const { otp } = passedBodyParams;
    const passedParams = Object.assign({}, options);
    passedParams.url = "https://api.ravepay.co/flwv3-pug/getpaidx/api/validatecharge";
    passedParams.method = "POST";
    passedParams.body.PBFPubKey = PubicKey; // set public key
    passedParams.body.transaction_reference = results.data.flwRef; // transaction reference
    passedParams.body.otp = otp;
return  await axios.create({passedBodyParams});
  }
}

async function verifyPayment(passedBodyParams){
    const apiUrl = "https://api.ravepay.co/flwv3-pug/getpaidx/api/v2";  // production endpoint
     const axiosVerify = axios.create({
        baseURL: apiUrl,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
    return await axiosVerify.post("/verify", {
        "txref":"MC-" + Date.now(), // transact refrence from innitiate payment
        "SECKEY":SecretKey // merchant secret key
      })  

}
module.exports = {
    initiateCardFunding,
    validateCardsWithPins,           //*  only one of these endpoints       */
    validateInternatinalCards,       //*    will be reached            */
    validatePayment,
    verifyPayment
};
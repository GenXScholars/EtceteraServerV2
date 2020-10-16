const axios = require("axios").default;
const md5 = require("md5");
const BillsTransactions = require("../../models/billsTransactModels");
const apiUrl = "http://ekodemo.phcnpins.com/API/vproxy.asmx"; // to be changed for production

//axios config
const ApiKey = "uvjqzm5xl6bw";
const dealercode = "";
const axiosCall = axios.create({
  baseURL: apiUrl,
//   headers: {
//     Authorization: `Bearer ${publickey}`,  
//   }
});



async function FetchCust_New(passedBodyParams) {
  if(!passedBodyParams.MeterNumber  && (passedBodyParams.MeterNumber === null || undefined)){
    throw "Account number is required";
  }
  if(!passedBodyParams.AccountType){
      throw "please specify your account type i.e prepaid or postpaid"
  }
  if(passedBodyParams) {
    const { MeterNumber, AccountType } = passedBodyParams;  
    const hashedVals = md5( MeterNo + dealercode );
     return await axiosCall.post(`/FetchCust_New`, {
        "MeterNo": MeterNumber,
        "hashstring": hashedVals,
        "api_key": ApiKey,
        "isprepaid": AccountType,
        "responseType": "json"
    })
  }
}

async function getDealerBalance(passedBodyParams) {
  if(!passedBodyParams.dealer_code  || (passedBodyParams.AccountNumber === null || undefined)){
      throw "invalid code entered"
  }
  if(passedBodyParams){
    const { dealer_code } = passedBodyParams;
    const hashedVals = md5( dealer_code + dealercode )
    return await axiosCall.post(`/FetchDealerBalance`, {
        "dealer_code": dealer_code,
        "hashstring": hashedVals,
        "api_key": ApiKey
    })
  }
}

async function FetchUsage(passedBodyParams) {
    if(!passedBodyParams.MeterNumber  && (passedBodyParams.MeterNumber === null || undefined)){
        throw "Meter number is required";
      }
      if(!passedBodyParams.StartDate && !passedBodyParams.EndDate){
          throw "please specify the enddate and startdate"
      }
    const { MeterNumber, StartDate, EndDate } = passedBodyParams;
    const hashedVals = md5( MeterNumber + dealercode )
    return await axiosCall.post(`/FetchUsage`, {
        "MeterNo": MeterNumber,
        "StartDate": StartDate,
        "EndDate": EndDate,
        "hashstring": hashedVals,
        "api_key": ApiKey
    }) 
}

async function PostTransaction_New(passedBodyParams) {
  if(!passedBodyParams.AccountNumber && (passedBodyParams.AccountNumber === null || undefined)){
     throw "Please input a valid Account Number"
   }
  if(!passedBodyParams.Ammount && Math.sign(passedBodyParams.Ammount = -1)){
     throw "please specify a valid amount"
   }
  if(!passedBodyParams.email && (passedBodyParams.email === null || undefined)){
    throw " please enter a valid email"
  }
  if(!passedBodyParams.AccountType){
    throw "please specify your account type i.e prepaid or postpaid"
  }
  if(passedBodyParams){
    const { AccountNumber, Ammount, email, AccountType } = passedBodyParams;
    const hashedVals = md5( AccountNumber + dealercode);
    return await axiosCasll.post(`/PostTransaction_New`, {
        "AccountNo":  AccountNumber,
        "amount": Ammount,
        "hashstring": hashedVals,
        "api_key": ApiKey,
        "isprepaid": AccountType,
        "emailaddress": email,
        "txnref": Math.floor(Math.random() * 5565566),
        "responseType":"json"
    })
  }
}

async function FetchTxnByRef(passedBodyParams) {
    const { TransactRef } = passedBodyParams;
    const hashedVals = md5( TxnRef + dealercode )
    return await axiosCall.post(`/FetchTxnByRef`, {
        "TxnRef": TransactRef,
        "hashstring": hashedVals,
        "api_key": ApiKey
        
    }) 
}

module.exports = {
    FetchCust_New,
    getDealerBalance,
    FetchUsage,
    PostTransaction_New,
    FetchTxnByRef
};
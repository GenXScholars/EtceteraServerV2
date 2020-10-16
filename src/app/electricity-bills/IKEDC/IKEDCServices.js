const axios = require("axios");
const md5 = require("md5");
const BillsTransactions = require("../../models/billsTransactModels");
const apiUrl = "http://demoapi.iepins.com.ng/API/vproxy-sub.asmx"; // to be changed for production

//axios config
const ApiKey = "8AACD1B26E8255D709FB6AD0BA5D0C73";
const dealercode = "IE0167";
const axiosCall = axios.create({
  baseURL: apiUrl,
});



async function FetchCust(passedBodyParams) {
  if(!passedBodyParams.MeterNumber || (passedBodyParams.MeterNumber === null || undefined)){
    throw "Meter number is required";
  }
  if(passedBodyParams) {
    const { MeterNumber } = passedBodyParams;  
    const hashedVals = md5( MeterNumber + dealercode );
     return await axiosCall.post("/FetchCust", {
        "MeterNo": MeterNumber,
        "hashstring": hashedVals,
        "api_key": ApiKey,
    })
  }
}

async function getDealerBalance(passedBodyParams) {
  // if(!passedBodyParams.dealercode  && (passedBodyParams.AccountNumber === null || undefined)){
  //     throw "invalid code entered"
  // }
  
    const { dealer_code } = passedBodyParams;
    const hashedVals = md5( dealercode + dealercode )
    return await axiosCall.post("/FetchDealerBalance", {
        "dealer_code": dealercode,
        "hashstring": hashedVals,
        "api_key": ApiKey
    })
  
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
    return await axiosCall.post("/FetchUsage", {
        "MeterNo": MeterNumber,
        "StartDate": StartDate,
        "EndDate": EndDate,
        "hashstring": hashedVals,
        "api_key": ApiKey
    }) 
}

async function PostTransaction(passedBodyParams) {
  if(!passedBodyParams.AccountNumber || (passedBodyParams.AccountNumber === null || undefined)){
     throw "Please input a valid Account Number"
   }
  if(!passedBodyParams.Ammount && Math.sign(passedBodyParams.Ammount = -1)){
     throw "please specify a valid amount"
   }
  if(passedBodyParams){
    const { AccountNumber, Ammount, email, AccountType } = passedBodyParams;
    const hashedVals = md5( AccountNumber + dealercode);
    return await axios.post(`${apiUrl}/PostTransaction`, {
        "AccountNo":  AccountNumber,
        "amount": Ammount,
        "hashstring": hashedVals,
        "api_key": ApiKey
    })
  }
}

module.exports = {
    FetchCust,
    getDealerBalance,
    FetchUsage,
    PostTransaction
};
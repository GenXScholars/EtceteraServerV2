const axios = require("axios").default;
const md5 = require("md5");
const BillsTransactions = require("../../models/billsTransactModels");
const apiUrl = "http://eedcstaging.phcnpins.com/API/vproxy.asmx"; // to be changed for production

//axios config
const ApiKey = "uvjqzm5xl6bw";
const dealercode = "";
const axiosCall = axios.create({
  baseURL: apiUrl,
//   headers: {
//     Authorization: `Bearer ${publickey}`,  
//   }
});



async function FetchCust(passedBodyParams) {
  if(!passedBodyParams.AccountNumber || (passedBodyParams.AccountNumber === null || undefined)){
    throw "Account number is required";
  }
  if(passedBodyParams) {
    const { AccountNumber } = passedBodyParams;
    const hashedVals = md5( AccountNumber + dealercode);
     return await axiosCall.post(`/FetchCust`, {
        "AccountNo": AccountNumber,
        "hashstring": hashedVals,
        "api_key": ApiKey
    })
  }
}

async function getDealerBalance(passedBodyParams) {
  if(!passedBodyParams.dealer_code  && (passedBodyParams.AccountNumber === null || undefined)){
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

async function FetchTxnByRef(passedBodyParams) {
    const { TransactRef } = passedBodyParams;
    const hashedVals = md5( TxnRef + dealercode )
    return await axiosCall.post(`/FetchTxnByRef`, {
        "TxnRef": TransactRef,
        "hashstring": hashedVals,
        "api_key": ApiKey
        
    }) 
}

async function postTransaction(passedBodyParams) {
  if(!passedBodyParams.AccountNumber && (passedBodyParams.AccountNumber === null || undefined)){
     throw "Please input a valid Account Number"
   }
  if(!passedBodyParams.Ammount && Math.sign(passedBodyParams.Ammount = -1)){
     throw "please specify a valid amount"
   }
  if(!passedBodyParams.phoneNumber && (passedBodyParams.phoneNumber === null || undefined)){
    throw " please enter a valid phone number"
  }
  if(passedBodyParams){
    const { AccountNumber, Ammount, phoneNumber } = passedBodyParams;
    return await axiosCasll.post(`/postTransaction`, {
        AccountNo:  AccountNumber,
        amount: Ammount,
        hashstring : hashedVals,
        api_key: ApiKey,
        phoneNo: phoneNumber,
        txnref : Math.floor(Math.random() * 5565566),
  
    })
  }
}

module.exports = {
    FetchCust,
    getDealerBalance,
    FetchTxnByRef,
    postTransaction
};
const axios = require("axios").default;
const md5 = require("md5");
const BillsTransactions = require("../models/billsTransactModels");
const apiUrl = "http://autoresultdemo.fleettechltd.com"; // to be changed for production

//axios config
const ApiKey = "gTway134";
const dealercode = "";
const axiosCall = axios.create({
  baseURL: apiUrl,
  headers: {
    Authentication: `ApiKey ${ApiKey}`,  
  }
});


async function CheckResult(passedBodyParams) {
  if(!passedBodyParams.examYear  || Math.sign(passedBodyParams.examYear === -1) || (passedBodyParams.examYear === null || undefined)){
      throw "invalid year entered"
  }
  if(passedBodyParams){
    const { requestID, examYear, examNumber } = passedBodyParams;
    return await axiosCall.post(`/fetch`, {
        "RequestID": requestID,
        "Results": [
            { 
                "ExamYear": examYear,
                "ExamNumber": examNumber
            }
        ]
    })
  }
}



async function fetchDealerBalance(passedBodyParams) {
  if(!passedBodyParams.RequestID && Math.sign(passedBodyParams.RequestID = -1)){
     throw "invalid requestID"
   }
  if(passedBodyParams){
    const {  RequestID } = passedBodyParams;
    const hashedVals = md5( AccountNumber + dealercode);
    return await axiosCasll.post(`/checkBalance?RequestId=${RequestID}`, {
    })
  }
}

module.exports = {
    CheckResult,
    fetchDealerBalance
};
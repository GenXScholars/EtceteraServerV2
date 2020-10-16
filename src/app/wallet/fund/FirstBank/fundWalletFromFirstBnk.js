const axios = require("axios");
const Wallet = require("../../../models/walletModel");
const walletFundFirstBnkService = require("./fundFrmFirstBnkServices");
const walletFundNotifications = require("../../../shared/services");
const getJwtUser = require("../../../../_helpers/helperFuncs").decodeUserFromJWT;


//axios config for crediting wallet
const apiUrl = "https://sandbox.wallets.africa"; // to be changed for production
const publickey = "uvjqzm5xl6bw";
const axiosCall = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${publickey}`,  
  }
});

function  initiateFunding(req, res, next){
    walletFundFirstBnkService.initiateFirstBnk(req.body)
    .then((result) => {
        res.json({
            message: `funding wallet by from bank initiated`,
            result
        })
    }).catch(err => next(err))
}

function validate(req, res, next){
    walletFundFirstBnkService.validateFirstBnk(req.body)
    .then((result) => {
        const chargeResponseMessage = result.tx.chargeResponseMessage;
        const customer = result.tx.customer
        res.json({
            message: `Pin/Billing information correct, now proceed to verify successful transaction`,
            chargeResponseMessage,
            customer
        })
    }).catch(err => next(err))
}

async function verify(req, res, next){
    walletFundFirstBnkService.verifyFirstBnk(req.body)
    .then((results) => {
        const paidAmount = results.data.amount;
        const phoneNumber = results.data.custphone;
          axiosCall.post(`/wallet/credit`, {
          "transactionReference":Math.floor(Math.random() * 5565566),
          "amount": paidAmount,
          "phoneNumber": phoneNumber,
          "secretKey": "hfucj5jatq8h"
        }).then((data)=>{
            //get user for jwt in headers
            const user = getJwtUser(req);
            //update users wallet in db
            if(user){
                Wallet.findOneAndUpdate({email:user.email}, { walletBalance: walletBalance +=paidAmount  },
                      function(err, result){
                          if(err) next(err);
                      })}
        })
        res.json({
            message: `payment verified and your wallet has been credited`,
            data
        })
    }).catch(err => next(err))
}

module.exports = {
    initiateFunding,
    validate,
    verify,
}
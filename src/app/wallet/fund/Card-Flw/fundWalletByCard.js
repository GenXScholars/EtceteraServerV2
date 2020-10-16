const debug = require("debug")("app:WalletByCard");
const axios = require("axios");
const Wallet = require("../../../models/walletModel");
const walletFundByCardService = require("./fundByCardServices");
const walletFundNotifications = require("../../../shared/notifications/transactionMail");
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

async function  initiateFundingByCard(req, res, next){
    debug("I got here");
      const payment = await walletFundByCardService.initiateCardFunding(req.body);
      debug(payment)
    payment.then((result) => {
        debug(result);
        res.json({
            message: `funding wallet by card initiated`,
            
        })
    }).catch(err => next(err))
}

function validateNigerianCards(req, res, next){
    walletFundByCardService.validateCardsWithPins(req.body)
    .then((result) => {
        // const currency = result.data.currency;
        // const amount = result.data.amount;
        debug(result);

        debug(result)
        res.json({
            message: `cards  validation successful`,
            "curreny": currency,
            "amount": amount,
            
        })
    }).catch(err => next(err))
}

function validateInternationalCards(req, res, next){
    walletFundByCardService.fundWalletFromCard(req.body)
    .then((result) => {
        const currency = result.data.currency;
        const amount = result.data.amount;
        const customerDetails = result.data.customer;
        res.json({
            message: `cards  validation successful`,
            "curreny": currency,
            "amount": amount,
            customer
        })
    }).catch(err => next(err))
}

function validatePayment(req, res, next){
    walletFundByCardService.validatePayment(req.body)
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

async function verifyPayment(req, res, next){
    walletFundByCardService.verifyPayment(req.body)
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
    initiateFundingByCard,
    validateNigerianCards,
    validateInternationalCards,
    validatePayment,
    verifyPayment
}
const axios = require("axios");
const Wallet = require("../models/walletModel");
const GuestPayService = require("./guestPaymentServices");
const getJwtUser = require("../../_helpers/helperFuncs").decodeUserFromJWT;


//axios config for crediting wallet
const apiUrl = "https://sandbox.wallets.africa"; // to be changed for production
const publickey = "uvjqzm5xl6bw";
const axiosCall = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${publickey}`,  
  }
});

function  initiatePayment(req, res, next){
    GuestPayService.initiateGuestPayment(req.body)
    .then((result) => {
        res.json({
            message: "Your payment was initiated",
            result
        })
    }).catch(err => next(err))
}

function verify(req, res, next){
    GuestPayService.verifyGuestPayment(req.body)
    .then((result) => {
        const chargeResponseMessage = result.tx.chargeResponseMessage;
        const customer = result.tx.customer
        res.json({
            message: "payment verified",
            chargeResponseMessage,
            customer
        })
    }).catch(err => next(err))
}

// async function verify(req, res, next){
//     walletFundFirstBnkService.verifyFirstBnk(req.body)
//     .then((results) => {
//         const paidAmount = results.data.amount;
//         const phoneNumber = results.data.custphone;
//           axiosCall.post(`/wallet/credit`, {
//           "transactionReference":Math.floor(Math.random() * 5565566),
//           "amount": paidAmount,
//           "phoneNumber": phoneNumber,
//           "secretKey": "hfucj5jatq8h"
//         }).then((data)=>{
//             //get user for jwt in headers
//             const user = getJwtUser(req);
//             //update users wallet in db
//             if(user){
//                 Wallet.findOneAndUpdate({email:user.email}, { walletBalance: walletBalance +=paidAmount  },
//                       function(err, result){
//                           if(err) next(err);
//                       })}
//         })
//         res.json({
//             message: `payment verified and your wallet has been credited`,
//             data
//         })
//     }).catch(err => next(err))
// }

module.exports = {
    initiatePayment,
    verify,
}
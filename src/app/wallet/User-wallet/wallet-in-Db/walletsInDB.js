const config = require("../../../../config/constants");
const walletService = require("./walletsInDBServices");
const transactions = require("../../../models/billsTransactModels");
const bcrypt = require("bcryptjs");
const walletCreationNotifications = require("../../../shared/notifications/walletCreationNotifications");


function getWalletBalanceInDB(req, res, next){
    walletService.getWalletBalance(req.body)
    .then((result)=>{
        res.json({
            message:`wallet balance retrieved succesfuly`,
            result
        })
    }).catch(err => next(err))
}

function getWalletInDBByid(req, res, next){
    walletService.getSingleWallet(req.body)
    .then((result) => {
        res.json({
            message: `wallet retreievd succesfuly`,
            result
        })
    }).catch(err => next(err))
}

function getAllWalletsFromDB(req, res, next) {
     walletService.getAll()
           .then((result) =>{
             res.json({
                 message: `Wallets retrieved succesfully`,
                 result
             })
         }
         ).catch(err => next(err))
}

function deleteAWallet(req, res, next){
    walletService.delete(req.body)
    .then((result) => {
        const data = result.data.Data;
        res.json({
            message: `wallets deleted`,
            data
        })
    }

    ).catch(err => next(err))
}



module.exports = {
    getAllWalletsFromDB,
    getWalletBalanceInDB,
    getWalletInDBByid,
    deleteAWallet
}
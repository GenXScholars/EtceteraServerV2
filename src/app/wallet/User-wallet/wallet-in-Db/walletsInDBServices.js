const config = require("../../../../config/constants");
const bcrypt = require("bcryptjs");
const  Wallet  = require("../../../models/walletModel");


async function getAll() {
    return await Wallet.find();
}

async function getWalletBalance(id) {
    return await Wallet.findById(id);;
}

async function getSingleWallet(id) {
    return await Wallet.findById(id);
}

async function _delete(id) {
    await Wallet.findByIdAndRemove(id);
}

module.exports = {
    getAll,
    getSingleWallet,
    getWalletBalance,
    delete: _delete
};
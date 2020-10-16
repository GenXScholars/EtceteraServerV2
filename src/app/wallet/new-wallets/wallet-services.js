const config = require("../../../../config/constants");
const bcrypt = require("bcryptjs");
const  Wallet  = require("../../../models/walletModel");


async function createWallet() {
    ;
}

async function updateWallet() {
    ;
}

async function transferFromWalletToBnk(id) {
    ;
}

async function transferFromWalletToWallet(id) {
    ;
}

async function _delete(id) {
    ;
}

module.exports = {
    createWallet,
    updateWallet,
    transferFromWalletToBnk,
    transferFromWalletToWallet,
    deleteWallet: _delete,
};
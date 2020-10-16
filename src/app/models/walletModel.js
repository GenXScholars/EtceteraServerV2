const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

const tables = require('./schemas/walletSchema');

const walletSchema = new Schema(tables.schemas);
walletSchema.plugin(uniqueValidator);
const Wallet = mongoose.model('wallet', walletSchema);

module.exports = Wallet;
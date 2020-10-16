const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

const tables = require('./schemas/cardsTokenSchema');

const cardTokenSchema = new Schema(tables.schemas);
cardTokenSchema.plugin(uniqueValidator);
const CardToken = mongoose.model('cardToken', cardTokenSchema);


module.exports = CardToken;
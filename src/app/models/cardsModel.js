const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

const tables = require('./schemas/cardsSchema');

const cardSchema = new Schema(tables.schemas);
 cardSchema.plugin(uniqueValidator);
const Card = mongoose.model('card', cardSchema);


module.exports = Card;
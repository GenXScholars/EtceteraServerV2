const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

const tables = require('./schemas/orderSchema');

const orderSchema = new Schema(tables.schemas);
orderSchema.plugin(uniqueValidator);
const Order = mongoose.model('order', cardSchema);


module.exports = Order;
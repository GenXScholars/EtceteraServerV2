const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

const tables = require('./schemas/billTransacSchema');

const billsSchema = new Schema(tables.schemas);
billsSchema.plugin(uniqueValidator, { message :'Error, {PATH} must be unique'});
const Bill = mongoose.model('bill', billsSchema);


module.exports = Bill;
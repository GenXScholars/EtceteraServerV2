const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

const tables = require('./schemas/jwtSchema');

const tokenSchema = new Schema(tables.schemas);
tokenSchema.plugin(uniqueValidator, { message :'Error, {PATH} must be unique'});
const Token = mongoose.model('token', tokenSchema);


module.exports = Token;
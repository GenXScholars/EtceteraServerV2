const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

const tables = require('./schemas/adminSchema');

const adminSchema = new Schema(tables.schemas);
adminSchema.plugin(uniqueValidator, { message :'Error, {PATH} must be unique'});
const Admin = mongoose.model('admin', adminSchema);


module.exports = Admin;
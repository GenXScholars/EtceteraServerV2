const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

const tables = require('./schemas/merchantSchema');

const merchantSchema = new Schema(tables.schemas);
merchantSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

merchantSchema.plugin(uniqueValidator, { message :'Error, {PATH} must be unique'});

const Merchant = mongoose.model('merchant', merchantSchema);


module.exports = Merchant;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

const tables = require('./schemas/userSchema');

const userSchema = new Schema(tables.schemas);
userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});
userSchema.plugin(uniqueValidator, { message :'Error, {PATH} must be unique'});
const User = mongoose.model('user', userSchema);


module.exports = User;
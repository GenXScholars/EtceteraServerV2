const config = require('../../config/constants');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const  Merchant  = require('../models/merchantModel');


async function getAll() {
    return await Merchant.find();
}

async function getById(id) {
    return await Merchant.findById(id);
}

async function create(newMerchant) {
    // validate
    if(!newMerchant.username && !newMerchant.password && !newMerchant.email){
        throw "username, email and password fields cannot be empty";
    }
    if(!newMerchant.username && !newMerchant.password){
        throw "username and password fields cannot be empty";
    }
    if(!newMerchant.username){
        throw "username field cannot be empty";
    }
    if(!newMerchant.password){
        throw "password field cannot be empty";
    }

    if(!newMerchant.email){
        throw "email field cannot be empty";
    }
    
    if (await Merchant.findOne({ username: newMerchant.username })) {
        throw 'Username "' + newMerchant.username + '" is already taken';
    }
    if (await Merchant.findOne({ email: newMerchant.email })) {
        throw 'Email "' + newMerchant.email + '" is already taken';
    }
    if (newMerchant.password) {
         // hash password
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newMerchant.password, salt, async function(err, hash) {
                    const merchant = await Merchant.create(
                        {
                            username:newMerchant.username,
                            password: hash,
                            email:newMerchant.email
                            }, function(err, merchant){
                        if(err) throw err; 
                       

                    });
                });
            });
        } 

}

async function update(id, newMerchant) {
    const merchant = await Merchant.findById(id);

    // validate
    if (!merchant) throw 'Merchant not found';
    if (merchant.username !== newMerchant.username && await Merchant.findOne({ username: newMerchant.username })) {
        throw 'Username "' + newMerchant.username + '" is already taken';
    }

    // hash password if it was entered
    if (newMerchant.password) {
        newMerchant.hash = bcrypt.hashSync(newMerchant.password, 10);
    }

    // copy newMerchant properties to merchant
    Object.assign(merchant, newMerchant);

    await merchant.save();
}

async function _delete(id) {
    await Merchant.findByIdAndRemove(id);
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};
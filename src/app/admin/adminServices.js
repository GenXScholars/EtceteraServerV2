const config = require("../../config/constants");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const  Admin  = require("../models/adminModel");

async function getAll() {
    return await Admin.find();
}

async function getById(id) {
    return await Admin.findById(id);
}

async function create(newAdmin) {
    // validate
    if(!newAdmin.username && !newAdmin.password && !newAdmin.email){
        throw "username, email and password fields cannot be empty";
    }
    if(!newAdmin.username && !newAdmin.password){
        throw "username and password fields cannot be empty";
    }
    if(!newAdmin.username){
        throw "username field cannot be empty";
    }
    if(!newAdmin.password){
        throw "password field cannot be empty";
    }

    if(!newAdmin.email){
        throw "email field cannot be empty";
    }
    
    if (await Admin.findOne({ username: newAdmin.username })) {
        throw 'Username "' + newAdmin.username + '" is already taken';
    }
    if (await Admin.findOne({ email: newAdmin.email })) {
        throw 'Email "' + newAdmin.email + '" is already taken';
    }
    if (newAdmin.password) {
         // hash password
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newAdmin.password, salt, async function(err, hash) {
                    const admin = await Admin.create(
                        {
                            username:newAdmin.username,
                            password: hash,
                            email:newAdmin.email
                            }, function(err, admin){
                        if(err) throw err; 
                       

                    });
                });
            });
        } 

}

async function update(id, newAdmin) {
    const admin = await Admin.findById(id);

    // validate
    if (!admin) throw 'Admin not found';
    if (admin.username !== newAdmin.username && await Admin.findOne({ username: newAdmin.username })) {
        throw 'Username "' + newAdmin.username + '" is already taken';
    }

    // hash password if it was entered
    if (newAdmin.password) {
        newAdmin.hash = bcrypt.hashSync(newAdmin.password, 10);
    }

    // copy newAdmin properties to admin
    Object.assign(admin, newAdmin);

    await admin.save();
}

async function _delete(id) {
    await Admin.findByIdAndRemove(id);
}


module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};
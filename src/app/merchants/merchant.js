const config = require('../../config/constants');
const merchantService = require('./merchantServices');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Merchant = require('../models/merchantModel');
require('../../auth/userPassport')
const omitPassword = require("../../_helpers/helperFuncs").omitPassword;





async function  merchantLogin(req, res, next){
    let username = req.body.username;
    let password = req.body.password;
    console.log("password" + req.body.password);
    console.log("username" + req.body.username);
    if(!username || !password){
       res.status(404).json({
           message: "username or password cannot be empty"
       })
    }
    const merchant = await Merchant.findOne({username});
    if(merchant){
     bcrypt.compare(password, merchant.password).then((result) => {
       console.log(res);
       if(result){
              //merchant password in the token so we pick only the email and id
      const body = { _id : merchant._id, role: "merchant" };
      //Sign the JWT token and populate the payload with the merchant email and id
      const token = jwt.sign({ merchant : body }, config.SECRET, { expiresIn: 60 });
      //Send back the token to the merchant

       
       res.status(200).json({
          merchant: omitPassword(merchant._doc),
          token
         })
       } 
     })      
    } else {
        res.status(404).json({
            message: "username or password inccorect"
        })
    }
}

function register(req, res, next) {
    merchantService.create(req.body)
        .then(() => res.json({
            message: `merchant with username ${req.body.username} was created`
        }))
        .catch(err => {
            next(err)
        });
}

function getAll(req, res, next) {
    merchantService.getAll()
        .then(merchants => res.json(merchants))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    merchantService.getById(req.merchant.sub)
        .then(merchant => merchant ? res.json(merchant) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    merchantService.getById(req.params.id)
        .then(merchant => merchant ? res.json(merchant) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    merchantService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    merchantService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}


module.exports = {
    merchantLogin,
    getAll,
    getCurrent,
    getById,
    register,
    update,
    delete: _delete
}; 
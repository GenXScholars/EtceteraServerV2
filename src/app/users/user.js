const config = require("../../config/constants");
const debug = require("debug")("app:UserControllers");
const userService = require("./userServices");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const Token = require("../models/jwtModel");
require("../../auth/userPassport");
const omitPassword = require("../../_helpers/helperFuncs").omitPassword;


async function  userLogin(req, res, next){
    let username = req.body.username;
    let password = req.body.password;
    console.log("password" + req.body.password);
    console.log("username" + req.body.username);
    console.log("ipAddress" + " " + req.ip);

    if(!username || !password){
       res.status(404).json({
           message: "username or password cannot be empty"
       })
    }
    const dbuser = await User.findOne({username});
    
    console.log(dbuser);
    if(dbuser){
     bcrypt.compare(password, dbuser.password).then((result) => {
         debug("result"+ "is" + result )
       if(result){
              //user password in the token so we pick only the email and id
      const body = { _id : dbuser._id, role:"user"};
      //Sign the JWT token and populate the payload with the user email and id
      const token = jwt.sign({ user : body }, config.SECRET);
    //   store jwt in db for reference
    //     Token.create({
    //        token: token,
    //        user: req.body.username,
    //        expired:false
    //    }, function(err, token){
    //        if(err)  next(err);
    //    })

      //Send back the token to the user
       res.status(200).json({
           user:omitPassword(dbuser._doc),
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
    userService.create(req.body)
        .then(() => res.json({
            message: `user with username ${req.body.username} was created`
        }))
        .catch(err => {
            next(err)
        });
}

function getAll(req, res, next) {
    console.log( "user tokenized" + " " + req.headers)
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    console.log("id" + " " + req.params.id);
    userService.getSingleUser(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}
// module.exports ={
//     async register(req, res, next){
//         let username = req.body.username;
//         let password = req.body.password;
//         let email = req.body.email;
//        let newUser = await  require('../models/userModel').create({
//             username: username,
//             password: password,
//             email: email,
//           });
//        newUser.then(user => {
//            res.send(200).json({
//                message: 'user was created sucesfully..check db'
//            })
//        }).catch(err =>{
//            if(err) {
//                res.send(404).json({
//                    message: "user was not created succesfully"
//                })
//            };
//        })
//     }
// } 

module.exports = {
    userLogin,
    getAll,
    getCurrent,
    getById,
    register,
    update,
    delete: _delete
}; 
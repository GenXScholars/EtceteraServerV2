const config = require("../../config/constants");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const  User  = require("../models/userModel");

module.exports = {
    getAll,
    getSingleUser,
    create,
    update,
    delete: _delete
};


//     async function authenticate({username, password} ) {       
//         const user = await User.findOne({ username });
       
//         // if (user && bcrypt.compareSync(password, user.hash)) {
//         //     const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
//         //     return {
//         //         ...user.toJSON(),
//         //         token
//         //     };
//         // }
//       if(user){
//         bcrypt.compare(password, user.password).then((result)=> {
//             if(result){
//                 const token = jwt.sign({ sub: user._id },config.SECRET, { expiresIn: '3d' });
//                 return {
//                     ...user.toJSON(),
//                     token
//                 };
//             }});
//       }
        
    
   
// }

async function getAll() {
    return await User.find();
}

async function getSingleUser(id) {
    return await User.findById(id);
}

async function create(userParam) {
    // validate
    if(!userParam.username && !userParam.password && !userParam.email){
        throw "username, email and password fields cannot be empty";
    }
    if(!userParam.username && !userParam.password){
        throw "username and password fields cannot be empty";
    }
    if(!userParam.username){
        throw "username field cannot be empty";
    }
    if(!userParam.password){
        throw "password field cannot be empty";
    }

    if(!userParam.email){
        throw "email field cannot be empty";
    }
    
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }
    if (await User.findOne({ email: userParam.email })) {
        throw 'Email "' + userParam.email + '" is already taken';
    }
    if (userParam.password) {
         // hash password
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(userParam.password, salt, async function(err, hash) {
                    const user = await User.create(
                        {
                            username:userParam.username,
                            password: hash,
                            email:userParam.email
                            }, function(err, user){
                        if(err) throw err; 
                    });
                });
            });
        } 

}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}
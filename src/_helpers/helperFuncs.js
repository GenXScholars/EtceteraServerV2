const jwt = require("jsonwebtoken");
const User = require("../app/models/userModel");
const Merchant = require("../app/models/merchantModel");
const Admin = require("../app/models/adminModel");

const SECRET = require("../config/constants").SECRET;



function omitPassword(user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}


// method to decode user with jwt
 async function decodeUserFromJWT(req){
    if (req.headers && req.headers.authorization) {
        let authorization = req.headers.authorization.split(' ')[1],
            decoded;
        try {
            decoded = jwt.verify(authorization, SECRET);
        } catch (err) {
            next(err)
        }
        const userId = decoded.id;
        // Fetch the user || merchant || admin by id 
         const user = await User.findOne({_id: userId});
         const merchant = await Merchant.findOne({_id: userId});
         const admin = await Admin.findOne({_id: userId});
        if(user){
            return user;
        }
        if(merchant){
            return merchant;
        }
        if(admin){
            return admin;
        }
    }
    // if there are no headers
    return res.send(500);
}

module.exports ={
    decodeUserFromJWT,
    omitPassword
}
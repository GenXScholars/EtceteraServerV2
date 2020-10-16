const mongoose = require('mongoose');
module.exports.schemas = {
    email: {
        type: String,
        unique:true,
        required: true,
    },
    username:{
        type:String,
        unique: true,
        required: true
    },
    firstName:{
        type: String
    },
    lastName:{
        type: String
    },
    password:{
        type:String,
        required: true,
    },
    merchantId:{
        type:Number
    },
    dateCreated:{
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        default:'USER',
        enum: ['USER', 'MERCHANT', 'ADMIN']
    },
    merchant : 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Merchant'
        },
    wallet :
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Wallet'
        }]
    
}
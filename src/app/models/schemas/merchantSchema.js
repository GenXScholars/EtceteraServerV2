const mongoose = require('mongoose');

module.exports.schemas = {
    email:{
        type: String,
        unique: true,
        required: true,
    },
    username:{
        type:String,
        required: true
    },
    firstname:{
        type: String,
    },
    lastname:{
        type: String,
    },
    password:{
        type:String,
        required:true,
    },
    merchantId:{
        type:String,
        default: Math.floor(Math.random() *10000),
    },
    role: {
        type: String,
        default:'MERCHANT',
        enum: ['USER', 'MERCHANT', 'ADMIN']
    },
    users : [
        {type: mongoose.Schema.Types.ObjectId,ref:'User'}
    ]
}
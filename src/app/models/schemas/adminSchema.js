const mongoose = require('mongoose');
module.exports.schemas = {
    username:{
        type:String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true
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
    dateCreated:
     {
          type: Date,
           default: Date.now },
    role: {
        type: String,
        default:'ADMIN',
        enum: ['USER', 'MERCHANT', 'ADMIN']
    },
    users : [
        {type: mongoose.Schema.Types.ObjectId,ref:'User'}
    ],
    merchants : [
        {type: mongoose.Schema.Types.ObjectId,ref:'Merchant'}
    ],
    wallets : [
        {type: mongoose.Schema.Types.ObjectId,ref:'Wallet'}
    ]

}
const mongoose = require('mongoose');

module.exports.schemas = {
    walletOwner:{
       type:String,
       required:true
    },
    walletPin:{
        type:String
    },
    walletEmail: {
       type: String,
       unique: true
    },
    walletPassword:{
        type:String
    },
    phoneNumber:{
        type:String,
        unique: true,
        required:true
    },
    walletBalance:{
        type: String,
        required: true,
    },
    bankAccountNumber:{
          type:String,
          required:true
      },
    bvn:{
          type:String,
      },
      user:
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        }]
             
}
const mongoose = require('mongoose');
module.exports.schemas = {
    typeOfTransact:{
        type:String,
        required: true
    },
    ownerOfTransaction:{
        type: String,
        unique:true
        
    },
    transactionRef:{
        type: String,
        unique: true
    },
    dateCreated:
     {
          type: Date,
           default: Date.now
     },
  amountPaid:{
     type: String
 },
 users : [
    {type: mongoose.Schema.Types.ObjectId,ref:'User'}
]
   

}
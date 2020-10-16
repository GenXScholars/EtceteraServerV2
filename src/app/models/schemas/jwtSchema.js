const mongoose = require('mongoose');
module.exports.schemas = {
    token:{
        type:String,
        unique: true,
        required: true
    },
    user:{
        type: String,
        unique:true
        
    },
    dateCreated:
     {
          type: Date,
           default: Date.now
     },
expired:
{
    type:Boolean
}
   

}
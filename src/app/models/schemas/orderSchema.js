module.exports.schemas = {
    orderType:{
        type: String,
        required: true,
        enum: ['MOBILE RECHARGE', 'CABLE RECHARGE', 'ELECTRICITY RECHARGE', 'BANK TRANSFER']
    },
    merchant : [
        {type: mongoose.Schema.Types.ObjectId,ref:'Merchant'}
    ],
    user :
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
}
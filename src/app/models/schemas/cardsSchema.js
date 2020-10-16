module.exports.schemas = {
    cardNumber:{
        type: String,
        unique: true,
        required: true,
    },
    cardValidity:{
        type: String,
        required: true
    },
    cardExpiryDate:{
        type: String,
        required: true,
    },
    NameOnCard:{
        type: String,
        required: true
    },
    cardType:{
        type:String,
        required: true
    },
    cardFlag:{
        type: String,
        required: false
    },
    cardsPassword:{
        type: String,
        required: true
    },
}
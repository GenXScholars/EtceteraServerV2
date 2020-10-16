const Cards = require("../models/cardsModel");

async function createNewCard(passedBodyParams){
    if(!passedBodyParams){
        throw "form cannot be empty"
    }

    if (await Cards.findOne({ cardNumber: passedBodyParams.cardNumber })) {
        throw "Card already in use ";
    }
      const { cardNumber, cardValidity, cardExpiryDate, NameOnCard, cardType, cardFlag } = passedBodyParams;
    return await Cards.create({
         cardNumber,
         cardValidity,
         cardExpiryDate,
         NameOnCard,
         cardType,
         cardFlag,
    })
}

async function getByCardId(id){
    return await Cards.findById(id);
}

async function getAllCards() {
    return await Cards.find();
}
async function updateCard(id, passedBodyParam){
    const card = await Cards.findById(id);

    // validate
    if (!card) throw 'Card not found';

    // copy userParam properties to user
    Object.assign(card, passedBodyParam);

    await card.save();
}

async function _delete(id) {
    await Cards.findByIdAndRemove(id);
}

module.exports = {
    createNewCard,
    getByCardId,
    getAllCards,
    updateCard,
    _delete
}
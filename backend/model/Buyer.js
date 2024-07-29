const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
    buyerId: {
        type: Number,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    buyerFirstName: {
        type: String,
        required: true,
    },
    buyerLastName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isBuyerActive: {
        type: Boolean,
        default: true
    }
});

module.exports=mongoose.model('buyers', buyerSchema);

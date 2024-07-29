const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
    sellerId: {
        type: Number,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    sellerFirstName: {
        type: String,
        required: true,
    },
    sellerLastName: {
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
    isSellerActive: {
        type: Boolean,
        default: true
    }
});

module.exports=mongoose.model('sellers', sellerSchema);

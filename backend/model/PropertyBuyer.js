const mongoose = require('mongoose');

const propertyBuyerSchema = new mongoose.Schema({
    propertyId: {
        type: Number,
        required: true
    },
    propertyBuyerId: {
        type: Number,
        required: true
    },
    propertySellerId: {
        type: Number,
        required: true
    },
    interested: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('PropertyBuyer', propertyBuyerSchema);

const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    propertySellerId: {
        type: Number,
        required: true
    },
    propertyId: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    noOfBedroom: {
        type: String,
        required: true
    },
    noOfBathroom: {
        type: String,
        required: true
    },
    nearbySchool: {
        type: Boolean,
        required: true
    },
    nearbyCollege: {
        type: Boolean,
        required: true
    },
    nearbyHospital: {
        type: Boolean,
        required: true
    },
    like:{
        type : Number,
        required : true
    }
});

module.exports = mongoose.model('properties', propertySchema);

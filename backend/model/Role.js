const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    userId: {
        type: Number,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role:{
        type: String,
        required: true
    }
});

module.exports=mongoose.model('roles', roleSchema);

const mongoose = require("mongoose");

const registerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    surname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    contact: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    refreshToken: {
        type: String,

    },

    otp: {
        type: String
    },

    otpExpiry: {
        type: Date
    }
}, {timestamps: true});

module.exports = mongoose.model("registeration", registerSchema);
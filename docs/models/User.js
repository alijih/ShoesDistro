const { boolean } = require('@hapi/joi');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    lastname: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    nickname: {
        type: String,
        required: true,
        min: 4,
        max: 255
    },
    rol: {
        type: Number,
        required: true,
        min: 0,
        max: 4
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        max: 255
    },
    active: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema);

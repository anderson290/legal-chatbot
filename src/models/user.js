'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    maritalStatus:{
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    conversation: {
        type: []
    }
});


module.exports = mongoose.model('user', schema);
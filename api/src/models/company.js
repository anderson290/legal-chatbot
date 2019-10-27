'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    companyName: {
        type: String,
        required: true
    },
    razaoSocial: {
        type: String,
        required: true
    },
    fantasyName: {
        type: String,
        required: true
    },
    cnpj: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber:{
        type: Number
    },
    email:{
        type: String
    },
    site:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    level:{
        type: Number,
        required: true
    }
});


module.exports = mongoose.model('company', schema);
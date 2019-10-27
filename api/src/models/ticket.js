'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    code: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    conversation: [
        {
            userType: String,
            message: String
        }
    ],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    companyId: {
        type: Schema.Types.ObjectId,
        ref: 'company',
        required: true
    },
    status:{
        type: String,
        required: true
    }
});


module.exports = mongoose.model('ticket', schema);
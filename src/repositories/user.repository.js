'use strict'

const mongoose = require('mongoose');
const User = mongoose.model('user');
const md5 = require('md5');


exports.authenticate = async (data) => {
    const res = await User.findOne({
        email: data.email, 
        password: data.password
    });

    return res;
}
'use strict'

const mongoose = require('mongoose');
const Company = mongoose.model('company');
const md5 = require('md5');

exports.get = () => {
    return Company.find();
}
exports.getById = (id) => {
    return Company.findById(id);
}

exports.create = (body) => {
    let company = new Company({
        companyName: body.companyName,
        razaoSocial: body.razaoSocial,
        fantasyName: body.fantasyName,
        cnpj: body.cnpj,
        address: body.address,
        phoneNumber: body.phoneNumber,
        email: body.email,
        site: body.site,
        password: md5(body.password + global.SALT_KEY),
        level: body.level
    });

    return company.save();
}

exports.update = (body) => {
    return Company.findByIdAndUpdate(body._id, body);
}


exports.delete = (id) => {
    console.log(id);
    return Company.findByIdAndDelete(id);
}

exports.authenticate = async (data) => {
    const res = await Company.findOne({
        email: data.email, 
        password: data.password
    });

    return res;
}
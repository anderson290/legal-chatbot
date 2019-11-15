'use strict'

const mongoose = require('mongoose');
const Ticket = mongoose.model('ticket');

exports.get = () => {
    return Ticket.find();
}

exports.getByCompany = (companyId) => {
    return Ticket.find({
        companyId: companyId
    });
}

exports.getByUser = (userId) => {
    return Ticket.find({
        userId: userId
    });
}

exports.create = (body) => {
    let ticket = new Ticket(body);

    return ticket.save();
}

exports.update = (body) => {
    console.log('aquiii',body);
    return Ticket.findByIdAndUpdate(body._id, body);
}

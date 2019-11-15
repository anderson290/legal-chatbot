'use strict'

const mongoose = require('mongoose');

const Ticket = mongoose.model('ticket');

const repository = require('../repositories/ticket.repository');



exports.getTickets = async (req, res) => {

    await repository.get().then(tickets => {

        res.status(200).send(tickets)

    });

}

exports.getTicketByCompany = async (req, res) => {

    await repository.getByCompany(req.body.companyId)
        .then(x => {

            res.status(201).send(x)

        }).catch(e => {

            res.status(400).send(400)

        });

}

exports.getTicketByUser = async (req, res) => {
    await repository.getByUser(req.body.userId)
    .then(x => {

        res.status(201).send(x)

    }).catch(e => {
        
        res.status(400).send(400)

    });
}

exports.createTicket = async (req, res) => {


    await repository.create(req.body)
        .then(x => {

            res.status(201).send({ message: "Ticket criado" })

        }).catch(e => {

            res.status(400).send({ message: "Ticket não criado" + e })

        });
}

exports.updateTicket = async (req, res) => {

    await repository.update(req.body)
        .then(x => {

            res.status(201).send({ message: "Ticket atualizado" })

        }).catch(e => {

            res.status(400).send({ message: "Ticket não atualizado" + e })

        });
}





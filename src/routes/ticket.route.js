'use strict'

const express = require('express');
const ticket = require('../controllers/ticket.controller');
const router = express.Router();

// const authService = require('./../services/auth.service');

router.get('/', ticket.getTickets);
router.post('/getByCompany', ticket.getTicketByCompany);
router.post('/getByUser', ticket.getTicketByUser);
router.post('/create', ticket.createTicket);
router.post('/update', ticket.updateTicket);
// router.post('/authenticate', ticket.authenticate);

module.exports = router;
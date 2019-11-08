'use strict'

const express = require('express');
const company = require('../controllers/company.controller');
const router = express.Router();

const authService = require('./../services/auth.service');
//authService.autorize,
router.post('/', company.getCompany);
router.get('/companies', company.getCompanies);
router.post('/create',  company.createCompany);
router.post('/authenticate', company.authenticate);
router.post('/decode-token', company.decodeToken);
router.put('/:id', company.updateCompany);
router.post('/:id', company.deleteCompany);

module.exports = router;
'use strict'

const mongoose = require('mongoose');

const Company = mongoose.model('company');
const md5 = require('md5');
const repository = require('../repositories/company.repository');
const authService = require('./../services/auth.service');


exports.getCompanies = async (req, res) => {

    await repository.get().then(companies => {

        res.status(200).send(companies)

    });

}

exports.getCompany = async (req, res) => {

    await repository.getById(req.body.id).then(company => {

        res.status(200).send(company)

    });

}

exports.createCompany = async (req, res) => {


    await repository.create(req.body)
        .then(x => {

            res.status(201).send({
                 message: "Empresa cadastrada",
                 status: 200
             })

        }).catch(e => {

            res.status(400).send({
                message: "Empresa não cadastrada" + e,
                status: 400
            });

        });
}

exports.authenticate = async (req, res) => {
    try {
        const company = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });


        if (!company) {
            res.status(404).send({
                message: 'Usuário ou senha inválidos'
            });
            return;
        }

        const token = await authService.generateToken(company);

        res.status(201).send({
            token: token,
            data: {
                fantasyName: company.fantasyName,
                email: company.email
            }
        });

    } catch{

    }


}

exports.decodeToken = async (req, res) => {

    try {
        const companyObject = await authService.decodeToken(req.body.token);

        res.status(200).send({
            company: companyObject._doc
        });
    } catch{ }

}

exports.updateCompany = async (req, res) => {

    await repository.update(req.body)
        .then(user => {
            res.status(200).send({
                message: 'Atualizado', 
                status: 200
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao atualizar a Empresa',
                data: e,
                status: 400
            });
        });
}

exports.deleteCompany = async (req, res, next) => {
    console.log(req.body);    
    await repository.delete(req.body._id)
        .then(x => {
            res.status(200).send({
                message: 'Empresa removida com sucesso',
                status: 200
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao remover a Empresa',
                data: e,
                status: 400
            });
        });
}


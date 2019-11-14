'use strict'
const watson = require('watson-developer-cloud/assistant/v1');
const ASSISTANT_IAM_URL = 'https://gateway.watsonplatform.net/assistant/api';
const ASSISTANT_IAM_APIKEY = '';
const md5 = require('md5');
const mongoose = require('mongoose');
const repository = require('../repositories/user.repository');
const UserConversation = mongoose.model('user');
const authService = require('./../services/auth.service');

const chatbot = new watson({
    'username': 'd2b20928-8536-4d46-9f4a-86c0cf2dcf7f',
    'password': 'MaadWhsaXdlw',
    'version': '2019-03-02',
    'url': ASSISTANT_IAM_URL,
    'iam_url': 'https://iam.bluemix.net/identity/token'

});

exports.createUser = async (req, res) => {
    let body = req.body;
    let user = new UserConversation({
        name: body.name,
        age: body.age,
        maritalStatus: body.maritalStatus,
        location: body.location,
        sex: body.sex,
        email: body.email,
        password: md5(body.password + global.SALT_KEY),
        level: body.level
})

    await user.save()
        .then(x => {
            res.status(201).send({ message: "User cadastrado" })

        }).catch(e => {
            res.status(400).send({ message: "User não cadastrado" + e })


        });
}

exports.authenticate = async (req, res) => {
    
    try {
        
        const user = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });
        
        if (!user) {
            res.status(404).send({
                message: 'Usuário ou senha inválidos'
            });
            return;
        }

        const token = await authService.generateToken(user);

        res.status(201).send({
            token: token,
            data: {
                name: user.name,
                email: user.email,
                level: user.level
            }
        });

    } catch {

    }


}

exports.decodeToken = async (req, res) => {

    try {
        const userObject = await authService.decodeToken(req.body.token);

        res.status(200).send({
            user: userObject._doc
        });
        
    } catch{ }

}

exports.getFirst = async (req, res) => {
    let payload = {
        workspace_id: 'e7a92d12-195e-475d-a8e4-56e9ad5ee1c5',
        context: {},
        input: {}
    };
    chatbot.message(payload, function trataResposta(err, resposta) {
        if (err) {
            console.log(err)
        }

        res.status(200).send({ message: resposta.output.text[0], options: resposta.output.generic[1]})
        if (resposta.output.text.length > 0) {
            console.log('======================================');
            console.log(resposta.output.text[0]);
            console.log('======================================');
        }
    });
}

exports.getUsers = async (req, res) => {

    UserConversation.find().then(users => {
        res.status(200).send(users)
    })


}

exports.updateUser = async (req, res) => {

    UserConversation.findByIdAndUpdate(req.body.id, req.body.user).then(user => {
        res.status(200).send({ message: 'Atualizado' })
    })
}

exports.sendMessage = async (req, res) => {
    let text = req.body.message;

    var payload2 = {
        workspace_id: 'e7a92d12-195e-475d-a8e4-56e9ad5ee1c5',
        context: req.body.context || {},
        input: { text } || {}
    }

    await chatbot.message(payload2, (err, resposta) => {


        console.log("AQUI", resposta)
        console.log('======================================');

        return res.status(201).send(resposta)
    });
}

exports.updateMessage = (req, res, next) => {
    const id = req.params.id;
    return res.status(201).send({
        id: id,
        item: req.body
    })
}
const express = require('express')
const OngController = require('./controllers/OngController')
const incidentController = require('./controllers/incidentController')
const profileController = require('./controllers/profileController')
const sessionController = require('./controllers/sessionController')
const {celebrate, Segments, Joi} = require('celebrate')

const routes = express.Router()

//Verifica Cadastro
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required().min(1000000000).max(99999999999),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), OngController.create)

//=====================
routes.get('/ongs', OngController.index)

//===================
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}), incidentController.index)

//===============================
routes.post('/incidents', incidentController.create)

//Varifica remoção de casos 
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), incidentController.delete)

//Verifica visualização de casos
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object().keys({
        authorization: Joi.number().required()
    }).unknown()
}), profileController.index)

//========================
routes.post('/session', sessionController.create)





module.exports = routes
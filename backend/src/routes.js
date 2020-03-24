const express = require('express')
const crypto = require('crypto')
const connection = require('./database/connection')

const routes = express.Router()

//listagem de ONGS
routes.get('/ongs', async (req, res) => {
    const ongs = await connection('ongs').select('*')
    return res.json(ongs)
})

//CADASTRO DE ONGS
routes.post('/ongs', async (req, res) => {
    var { name, email, whatsapp, city, uf} = req.body
    
    const id = crypto.randomBytes(4).toString('HEX')

    //A função async vai esperar a função await terminar para continuar o código
    await connection('ongs').insert({
        id, 
        name,
        email, 
        whatsapp, 
        city, 
        uf
    })    

    return res.json({ id })
})

module.exports = routes
const express = require('express')
const connection = require('../database/connection')
const generateUniqueId = require('../util/generateUniqueId')

module.exports = {
    //CADASTRO DE ONGS
    async create(req, res){
        
        var { name, email, whatsapp, city, uf} = req.body        
        
        const id = generateUniqueId()

        await connection('ongs').insert({
            id, 
            name,
            email, 
            whatsapp, 
            city, 
            uf
        })    
        return res.json({ id })
    },

    //listagem de ONGS
    async index(req, res){
        const ongs = await connection('ongs').select('*')
        return res.json(ongs)
    }
}

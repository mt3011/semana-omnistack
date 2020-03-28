const request = require('supertest')
const app = require('../../src/index')
const connection = require('../../src/database/connection')

describe('ONG', () => {

    //permite aos testes utilizar as migrations
    beforeEach(async() => {
        await connection.migrate.rollback() //Zera o banco de dados
        await connection.migrate.latest()
    })

    //Mata conecção com banco de dados para que não fique executando nada após os testes
    afterAll(async() => {
        await connection.destroy()
    })

    it('should be able to create a new ONG', async () => {
        const response = await request(app).post('/ongs').send({
            name: "Mais uma ONG pra Lista",
            email: "email@email.com",
            whatsapp: "85986096762",
            city: "Fortaleza",
            uf: "Ce"
        })
        expect(response.body).toHaveProperty('id')
        expect(response.body.id).toHaveLength(8)
    })
})
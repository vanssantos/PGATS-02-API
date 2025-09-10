//Bibliotecas
const request = require('supertest');
const sinon = require('sinon');
const {expect} = require('chai');

// App - aplicação
const app = require('../../app')

// Testes
describe('Transfer Controller', () => {
    describe('POST / transfers', () => {
            it('Quando informo remetente e destinatário inexistentes recebo 400 e mensagem JSON', async () => {
                const resposta = await request(app)
                    .post('/transfer')
                    .send({
                        from: "Vans",
                        to: "Priscila",
                        amount: 100
                    });

                expect(resposta.status).to.equal(400);
                expect(resposta.body).to.have.property('error', 'Sender or recipient not found.');
            });
    });

});
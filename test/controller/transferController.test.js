//Bibliotecas
const request = require('supertest');
const sinon = require('sinon');
const {expect} = require('chai');

// App - aplicação
const app = require('../../app')

//Mock
const transferService = require('../../service/transferService');


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
            
            it('Usando Mocks: Quando informo remetente e destinatário inexistentes recebo 400 e mensagem JSON', async () => {
                // Mocar apenas a função transfer do service
                const trasnferServiveMock = sinon.stub(transferService, 'transfer');
                trasnferServiveMock.returns({error: 'Sender or recipient not found.'});
                
                
                const resposta = await request(app)
                    .post('/transfer')
                    .send({
                        from: "Vanss",
                        to: "Priscilass",
                        amount: 100
                    });

                expect(resposta.status).to.equal(400);
                expect(resposta.body).to.have.property('error', 'Sender or recipient not found.');

                //Reseto o Mock
                sinon.restore()
            });

            it('Usando Mocks: Quando informo valores válidos eu tenho sucesso com 201 CREATED', async () => {
                // Mocar apenas a função transfer do service
                const trasnferServiveMock = sinon.stub(transferService, 'transfer');
                trasnferServiveMock.returns({ transfer:
                    {
                    from: "Vanessa", 
                    to: "Priscila",
                    amount: 100,
                    date: new Date()
                }});
                
                //esse é do controller
                const resposta = await request(app)
                    .post('/transfer')
                    .send({
                        from: "Vanessa",
                        to: "Priscila",
                        amount: 100
                    });

                expect(resposta.status).to.equal(201);
                expect(resposta.body).to.have.property('from', 'Vanessa');
                expect(resposta.body).to.have.property('to', 'Priscila');
                expect(resposta.body).to.have.property('amount', 100);

                //Reseto o Mock
                sinon.restore()
            });           


    });

});
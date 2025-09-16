
//Bibliotecas
const request = require('supertest');
const {expect} = require('chai');


//Teste external são testes de http, ou seja, faz o teste acessando a url da api e testar os endpoints

describe('Transfer HTTP', () => {
    describe('POST / transfers', () => {
        it('Quando informo remetente e destinatário inexistentes recebo 400', async () => {
            const resposta = await request('http://localhost:3000')
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

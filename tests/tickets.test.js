let mocha = require('mocha')
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../app')
let should = chai.should()

let cryptoServices = require('../security/cryptoServices')

chai.use(chaiHttp)

describe('tickets', () => {
    describe('rget logged in user\'s tickets', () => {
        it('it should get a list of tickets assigned to logged in user', async () => {
            chai.request(server)
                .post('/api/v1/users/register')
                .send({
                    "email": email,
                    'password': password
                })
                .then((res) => {
                    res.should.have.status(200)
                })
                .catch((err, res) => {
                    throw err
                })
        })
    })
})


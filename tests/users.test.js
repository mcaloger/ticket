let mocha = require('mocha')
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../app')
let should = chai.should()

let cryptoServices = require('../security/cryptoServices')

chai.use(chaiHttp)

describe('users', () => {
    describe('get /users', () => {
        it('it should get an array of users', (done) => {
            chai.request(server)
                .get('/api/v1/users/')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    done()
                })
        })
    }),
    describe('register user', () => {
        it('it should register a user given a random email and password', async () => {
            let email = await cryptoServices.generateRandomChars(12) + '@email.com'
            let password = await cryptoServices.generateRandomChars(12)
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


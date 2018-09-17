let mocha = require('mocha')
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../app')
let should = chai.should()

chai.use(chaiHttp)

describe('users', () => {
    describe('get /users', () => {
        it('it should get an array of users', (done) => {
            chai.request(server)
                .get('/api/v1/users/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                })
        })
    })
})


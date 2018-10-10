let express = require('express')

let router = express.Router()

let userServices = require('../data/services/userServices')

router.get('/', async (req, res, next) => {
    try {
        let result = await userServices.getUsers()
        res.json(result)
    } catch (e) {
        next()
    }
})

router.get('/user/:id', async (req, res, next) => {
    let userId = req.params.id

    try {
        let result = await userServices.getUserById(userId)
        res.json(result)
    } catch (e) {
        next()
    }
})

router.get('/check/:name', async (req, res, next) => {
    try {
        let result = await userServices.checkIfUserDoesNotExist(req.params.name)
        res.json({
            result: result
        })
    } catch (e) {
        next()
    }
})

router.post('/register', async (req, res, next) => {
    try {
        let email = req.body.email
        let password = req.body.password

        let result = await userServices.register(email, password)

        if (result === true) {
            res.status(201).json({
                message: "success"
            })
        } else {
            res.status(400).json({
                message: result.error
            })
        }
    } catch (e) {
        next()   
    }
})

router.post("/login", async (req, res, next) => {
    try {
        let email = req.body.email
        let password = req.body.password
        let login = await userServices.login(email, password)

        res.json(login)
    } catch (e) {
        next()
    }

})

router.get("/checklogin", async (req, res, next) => {

    try {
        let sessionToken = req.headers.sessiontoken

        let userId = await userServices.getLoggedInUser(sessionToken)

        res.json(userId)
    } catch (e) {
        next()
    }
})

module.exports = router
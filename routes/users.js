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
});

router.get('/user/:id', async (req, res, next) => {
    let userId = req.params.id
    console.log(userId)
    try {
        let result = await userServices.getUserById(userId)
        res.json(result)
    } catch (e) {
        console.log(e)
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
        let email = req.body.email;
        let password = req.body.password

        console.log('emailpass', email, password, 'reqbody', req.body)

        let login = await userServices.login(email, password)

        res.json(login)
    } catch (e) {
        next()
    }

})

router.get("/checklogin", async (req, res, next) => {
    console.log('checklogin')
    let sessionToken = req.headers.sessiontoken
    console.log('head', req.headers)
    console.log('checklogin', sessionToken)
    let userId = await userServices.getLoggedInUser(sessionToken)
    console.log(userId)

    res.json(userId)
})

module.exports = router;
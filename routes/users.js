let express = require('express')

let router = express.Router()

let bcryptServices = require('../security/bcryptServices')

let userServices = require('../data/services/userServices')

router.get('/', async (req, res, next) => {
  let result = await userServices.getUsers();
  res.json(result);
});

router.get('/check/:name', async (req, res, next) => {
  let result = await userServices.checkIfUserDoesNotExist(req.params.name);
  res.json({result: result})
})

router.post('/register', async (req, res, next) => {

  let email = req.body.email
  let password = req.body.password
  let result = true
  let doesNotExist = await userServices.checkIfUserDoesNotExist(email)

  if(result === true && doesNotExist === true) {

    let saltedHashedPassword = await bcryptServices.saltAndHash(password)
    console.log(saltedHashedPassword)

    let createUser = await userServices.createUser(email, saltedHashedPassword.hash, saltedHashedPassword.salt)
    if (createUser) {
      res.status(200).json({message: "Success"})
    } else {
      res.json({error: "Failed to create user."})
    }
  } else {
    res.json({error: "Validation failed."})
  }
})

router.post("/login", async (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password

  let login = await userServices.login(email, password)

  res.json(login)
})

router.post("/checklogin", async (req, res, next) => {
  let sessionId = req.body.sessionId
  let userId = await userServices.getLoggedInUsername(sessionId)
  res.json(userId)
})

module.exports = router;

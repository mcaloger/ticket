let express = require('express')

let router = express.Router()

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
  
  let result = await userServices.register(email, password)

  if(result === true){
    res.status(200).json({message: "success"})
  } else {
    res.status(500).json({message: "error"})
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

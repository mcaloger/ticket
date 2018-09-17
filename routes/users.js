let express = require('express');
let router = express.Router();

let userServices = require('../data/services/userServices');

router.get('/', async (req, res, next) => {
  let result = await userServices.getUsers();
  res.json(result);
});

router.get('/check/:name', async (req, res, next) => {
  let result = await userServices.checkIfUserDoesNotExist(req.params.name);
  res.json({result: result})
})

module.exports = router;

let express = require('express');
let router = express.Router();

let userServices = require('../data/services/userServices');

/* GET home page. */
router.get('/', async (req, res, next) => {
  let result = await userServices.getUsers();
  res.json(result);
});

router.get('/check/:name', async (req, res, next) => {
  let result = userServices.checkIfUserDoesNotExist(req.params.name);
  res.json(result)
})

module.exports = router;

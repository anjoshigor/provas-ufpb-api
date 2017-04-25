var express = require('express');
var router = express.Router();
var UserController = require('../business/control/userController');

var control = new UserController();

/* GET users listing. */
router.get('/users', (req, res, next) => {
  res.send(JSON.stringify([...control.getAll()]));
});

module.exports = router;

var express = require('express');
var router = express.Router();

//Importando o modelo do usuario
var User = require('../business/model/user')

//Importando controller do usuario
var userController = require('../business/control/userController')

var Controller = new userController()

router.get('/', (req, res, next) => {
  res.render('login', { title: 'Authentication | API' });
});

router.post('/', (req, res, next) => {
  new_user = new User(req.body.login, req.body.password);
  Controller.add(new_user);
  res.render('login', { title: 'Authentication | API' });
});

module.exports = router;

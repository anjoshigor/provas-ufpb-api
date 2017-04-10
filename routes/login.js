var express = require('express');
var router = express.Router();

//Importando o modelo do usuario
var user = require('../business/model/user')

//Importando controller do usuario
var userController = require('../business/control/userController')

var db = require('../dao/userDAO')

var controller = new userController()

router.get('/', (req, res, next) => {
  res.render('login', { title: 'Authentication | API' });
});

router.post('/', (req, res, next) => {
  new_user = new user(req.body.login, req.body.password)
  controller.add(new_user)
  db.save(controller.userMap)
  res.render('login', { title: 'Authentication | API' })
});

module.exports = router;

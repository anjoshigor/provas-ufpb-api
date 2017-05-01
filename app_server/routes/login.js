var express = require('express');
var router = express.Router();
//Importando o modelo do usuario
var User = require('../business/model/user')

//Importando controller do usuario
var LoginController = require('../business/control/loginController')

var controller = new LoginController();

router.get('/', (req, res, next) => {
  res.render('login', { title: 'Authentication | API' });
});

router.post('/', (req, res, next) => {
  var new_user = new User(req.body.login, req.body.password);

  try {
    controller.singIn(new_user);
    res.redirect('/dashboard');
  } catch (error) {
    res.render('login', { flash: { type: 'alert-danger', msg: error.message } });
  }

});


module.exports = router;

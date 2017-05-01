var express = require('express');
var router = express.Router();
//Importando o modelo do usuario
var User = require('../business/model/user')

//Importando controller do usuario
var RegisterController = require('../business/control/registerController')

var controller = new RegisterController();

router.get('/', (req, res, next) => {
  res.render('register', { title: 'Register | API' });
});

router.post('/', (req, res, next) => {
  var new_user = new User(req.body.login, req.body.password);

  try {
    controller.register(new_user);
    res.render('register', { flash: { type: 'alert-success', msg: 'Registro efetuado com sucesso!' } });
  } catch (error) {
    res.render('/', { flash: { type: 'alert-danger', msg: error.message } });
  }

});


module.exports = router;

var express = require('express');
var router = express.Router();
//Importando o modelo do usuario
var User = require('../business/model/user')
var ControllerFactory = require('../business/control/controllerFactory');
var type = require('../business/control/controllerType');
var ctrlRegister = ControllerFactory.getController(type.Register);

router.get(ctrlRegister.getPage);
router.post('/', (req, res, next) => {
  var new_user = new User(req.body.login, req.body.password);

  try {
    ctrlRegister.register(new_user);
    res.render('register', { flash: { type: 'alert-success', msg: 'Registro efetuado com sucesso!' } });
  } catch (error) {
    res.render('register', { flash: { type: 'alert-danger', msg: error.message } });
  }

});


module.exports = router;

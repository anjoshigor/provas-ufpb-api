/**Imports**/
var express = require('express');
var router = express.Router();
var type = require('../business/control/controllerType');
var ControllerFactory = require('../business/control/controllerFactory');
var User = require('../business/model/user')

/**Factory Method**/
var ctrlLogin = ControllerFactory.getController(type.Login);

router.get('/', ctrlLogin.getPage);

router.post('/', (req, res, next) => {
  var new_user = new User(req.body.login, req.body.password);

  try {
    ctrlLogin.singIn(new_user);
    res.redirect('/dashboard');
  } catch (error) {
    res.render('login', { flash: { type: 'alert-danger', msg: error.message } });
  }

});


module.exports = router;

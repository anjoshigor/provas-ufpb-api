var express = require('express');
var router = express.Router();
var type = require('../business/control/controllerType');
var ControllerFactory = require('../business/control/controllerFactory');
//Importando o modelo do usuario
var User = require('../business/model/user');

var ctrlUser = ControllerFactory.getController(type.User);

router.get('/', (req, res) => {
  res.render('dashboard/dashboard', {title: 'API | Dashboard'});
});

router.get('/adm/adicionar', (req, res) => {
  res.render('dashboard/adm/adicionar', {title: 'API | Dashboard - Administrador/Adicionar'});
});

router.get('/adm/consultar', (req, res) => {
  res.render('dashboard/adm/consultar', {title: 'API | Dashboard - Administrador/Consultar'});
});

router.get('/adm/remover', (req, res) => {
  res.render('dashboard/adm/remover', {title: 'API | Dashboard - Administrador/Remover'});
});

router.get('/adm/atualizar', (req, res) => {
  res.render('dashboard/adm/atualizar', {title: 'API | Dashboard - Administrador/Atualizar'});
});

router.post('/adm/adicionar', (req, res, next) => {
  var new_user = new User(req.body.login, req.body.password);

  try {
    ctrlUser.add(new_user);
    res.render('dashboard/adm/adicionar', { flash: { type: 'alert-success', msg: 'Registro efetuado com sucesso!' } });
  } catch (error) {
    res.render('dashboard/adm/adicionar', { flash: { type: 'alert-danger', msg: error.message } });
  }
});

router.delete('/adm/remover', (req, res, next) => {
  var new_user = new User(req.body.login, '');
  try {
    ctrlUser.delete(new_user);
    res.render('dashboard/adm/remover', { flash: { type: 'alert-success', msg: 'Registro removido com sucesso!' } });
  } catch (error) {
    res.render('dashboard/adm/remover', { flash: { type: 'alert-danger', msg: error.message } });
  }
});

module.exports = router;

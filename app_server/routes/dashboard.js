var express = require('express');
var router = express.Router();

//Importando o modelo do usuario
var User = require('../business/model/user')

//Importando controller do usuario
var UserController = require('../business/control/userController')

var controller = new UserController();

router.get('/', (req, res) => {
  res.render('dashboard/dashboard', {title: 'API | Dashboard'});
});

router.get('/adm/adicionar', (req, res) => {
  res.render('dashboard/adicionar', {title: 'API | Dashboard - Administrador/Adicionar'});
});

router.get('/dm/consultar', (req, res) => {
  res.render('dashboard/consultar', {title: 'API | Dashboard - Administrador/Consultar'});
});

router.get('/adm/remover', (req, res) => {
  res.render('dashboard/remover', {title: 'API | Dashboard - Administrador/Remover'});
});

router.get('/adm/atualizar', (req, res) => {
  res.render('dashboard/atualizar', {title: 'API | Dashboard - Administrador/Atualizar'});
});

router.post('/', (req, res, next) => {
  var new_user = new User(req.body.login, req.body.password);

  try {
    controller.add(new_user);
    res.render('/', { flash: { type: 'alert-success', msg: 'Registro efetuado com sucesso!' } });
  } catch (error) {
    res.render('/', { flash: { type: 'alert-danger', msg: error.message } });
  }
});

router.post('/', (req, res, next) => {
  var new_user = new User(req.body.login, '');

  try {
    controller.delete(new_user);
    res.render('/', { flash: { type: 'alert-success', msg: 'Registro removido com sucesso!' } });
  } catch (error) {
    res.render('/', { flash: { type: 'alert-danger', msg: error.message } });
  }
});

module.exports = router;

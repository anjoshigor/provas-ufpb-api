var express = require('express');
var router = express.Router();
var type = require('../business/control/controllerType');
var ControllerFactory = require('../business/control/controllerFactory');

var ctrlUser =  ControllerFactory.getController(type.User);

/* GET users listing. */
router.get('/users', (req, res, next) => {
  res.send(JSON.stringify([...ctrlUser.getAll()]));
});

module.exports = router;

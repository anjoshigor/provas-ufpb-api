var express = require('express');
var router = express.Router();
var UserController = require('../business/control/userController');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'API | PROVAS UFPB' });
  userController = new UserController();
});

module.exports = router;

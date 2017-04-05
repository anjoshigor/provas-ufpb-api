var express = require('express');
var router = express.Router();
var userController = require('./business/control/userController')

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

/* GET users listing. */
router.get('/login', function(req, res, next) {
	res.render('login');
});

/* POST add user */
router.post('/login', function(req, res, next) {
	userController.addUser(req.body.name, req.body.password);
});

module.exports = router;

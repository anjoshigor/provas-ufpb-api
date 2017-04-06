var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  res.render('login', { title: 'Authentication | API' });
});

module.exports = router;

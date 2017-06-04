var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  var response = {};
  response.message = "Everything is working fine!"
  res.send(response);
});

module.exports = router;

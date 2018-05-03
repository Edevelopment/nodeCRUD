var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect(301, '/home');
});

router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home page' });
});

module.exports = router;

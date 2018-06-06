var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.redirect(301, '/home');
});

router.get('/home', function(req, res, next) {
	ctrl = require('../controllers/pages.js');
	ctrl.getIndex();
	res.sendStatus(200);
});

module.exports = router;

"use strict"
var express = require('express');
var	router = express.Router();
var _ = require("underscore");
var path = require('path');
var fs = require('fs');
var multer  = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, 'runtime/images')
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var MAGIC_NUMBERS = {
	jpg: 'ffd8ffe0',
	jpg1: 'ffd8ffe1',
	png: '89504e47',
	gif: '47494638'
}

function checkMagicNumbers(magic) {
	if (magic == MAGIC_NUMBERS.jpg || magic == MAGIC_NUMBERS.jpg1 || magic == MAGIC_NUMBERS.png || magic == MAGIC_NUMBERS.gif) return true
}

/**
 * Проверка 
 * @param  {[type]} req   [description]
 * @param  {[type]} res   [description]
 * @param  {[type]} next) {             if (!req.headers['x-auth']) return next('router')  next()} [description]
 * @return {[type]}       [description]
 */
router.use(function (req, res, next) {
	if (req.url === '/user/login' || req.method == 'OPTIONS') {next(); return;};

	try {
		let required = require('../controllers/admin/user');
		let controller = new required(res, req);

		controller.checkAuth(next);
	} catch(e)  {
		console.error(e);
		res.sendStatus(404);
		res.end();
	}

})

router.options('*', function (req, res, next) {
	try {
		let required = require('../controllers/admin/index');
		let controller = new required(res, req);

		controller.showAllowedHttpMethods();
	} catch(e)  {
		console.error(e);
		res.sendStatus(404);
	}	
});


/* Вызов контроллера и create экшона */
router.post('/:controller/create', function(req, res, next) {
	try {	
		let required = require('../controllers/admin/' + req.params.controller);	
		let controller = new required(res, req);

		controller.createAction();
	} catch(e)  {
		console.error(e);
		res.sendStatus(404);
	}
});

/* Вызов контроллера и Index экшона */
router.post('/user/login', function(req, res, next) {
	try {
		let required = require('../controllers/admin/user');	
		let controller = new required(res, req);

		controller.loginAction();
	} catch(e)  {
		console.error(e);
		res.sendStatus(404);
	}
});

/* Вызов контроллера и create экшона */
router.post('/:controller/create', function(req, res, next) {
	try {	

		let required = require('../controllers/admin/' + req.params.controller);	
		let controller = new required(res, req);

		controller.createAction();
	} catch(e)  {
		console.error(e);
		res.sendStatus(404);
	}
});

/* Вызов контроллера и передаваемого экшона */
router.get('/:controller/:action', function(req, res, next) {
	try {
		let required = require('../controllers/admin/' + req.params.controller);
		let controller = new required(res, req);

		controller[req.params.action + 'Action']();
	} catch(e)  {
		console.error(e);
		res.sendStatus(404);
	}
});

/* Вызов контроллера и update экшона с параметром id
   Данные приходят через PUT */
router.put('/:controller/update/:id', function(req, res, next) {
	try {
		if (!Number.isInteger(parseInt(req.params.id)) || parseInt(req.params.id) <= 0) return res.sendStatus(404);

		let required = require('../controllers/admin/' + req.params.controller);
		let controller = new required(res, req);

		controller.updateAction(parseInt(req.params.id));
	} catch(e)  {
		console.error(e);
		res.sendStatus(404);
	}
});

/* Вызов контроллера и delete экшона с параметром id */
router.delete('/:controller/delete/:id', function(req, res, next) {
	try {
		if (!Number.isInteger(parseInt(req.params.id)) || parseInt(req.params.id) <= 0) return res.sendStatus(404);

		let required = require('../controllers/admin/' + req.params.controller);
		let controller = new required(res, req);

		controller.deleteAction(parseInt(req.params.id));
	} catch(e)  {
		console.error(e);
		res.sendStatus(404);
	}
});

/* Вызов контроллера и передаваемого экшона с параметром id */
router.get('/:controller/:action/:id', function(req, res, next) {
	try {
		if (!Number.isInteger(parseInt(req.params.id)) || parseInt(req.params.id) <= 0) return res.sendStatus(404);

		let required = require('../controllers/admin/' + req.params.controller);
		let controller = new required(res, req);

		controller[req.params.action + 'Action'](parseInt(req.params.id));
	} catch(e)  {
		console.error(e);
		res.sendStatus(404);
	}
});

module.exports = router;

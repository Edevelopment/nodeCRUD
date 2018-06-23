"use strict"
var express = require('express');
var	router = express.Router();
var _ = require("underscore");

/* Вызов Index контроллера и Index экшона */
router.get('/', function(req, res, next) {
	try {
		let required = require('../controllers/admin/index');
		let controller = new required(res, req);

		controller.indexAction();
	} catch(e)  {
		console.error(e);
		res.sendStatus(404);
	}
});

router.options('*', function (req, res, next) {
	console.log('test');
	try {
		let required = require('../controllers/admin/index');
		let controller = new required(res, req);

		controller.showAllowedHttpMethods();
	} catch(e)  {
		console.error(e);
		res.sendStatus(404);
	}	
})

/* Вызов контроллера и Index экшона */
router.get('/:controller/', function(req, res, next) {
	try {
		let required = require('../controllers/admin/' + req.params.controller);	
		let controller = new required(res, req);

		controller.indexAction();
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

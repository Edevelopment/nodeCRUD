"use strict"
var express = require('express');
var	router = express.Router();
var _ = require("underscore");

/* Вызов Index контроллера и Index экшона */
router.get('/', function(req, res, next) {
	let required = require('../controllers/admin/index');
	let controller = new required(res, req);

	controller.indexAction();
});

/* Вызов контроллера и Index экшона */
router.get('/:controller/', function(req, res, next) {
	let required = require('../controllers/admin/' + req.params.controller);	
	let controller = new required(res, req);

	controller.indexAction();
});

/* Вызов контроллера и create экшона */
router.post('/:controller/create', function(req, res, next) {
	let required = require('../controllers/admin/' + req.params.controller);	
	let controller = new required(res, req);

	controller.createAction();
});

/* Вызов контроллера и передаваемого экшона */
router.get('/:controller/:action', function(req, res, next) {
	let required = require('../controllers/admin/' + req.params.controller);
	let controller = new required(res, req);

	controller[req.params.action + 'Action']();
});

/* Вызов контроллера и update экшона с параметром id
   Данные приходят через PUT */
router.put('/:controller/update/:id', function(req, res, next) {
	if (!Number.isInteger(parseInt(req.params.id)) || parseInt(req.params.id) <= 0) return res.send(404);

	let required = require('../controllers/admin/' + req.params.controller);
	let controller = new required(res, req);

	controller.updateAction(parseInt(req.params.id));
});

/* Вызов контроллера и delete экшона с параметром id */
router.delete('/:controller/delete/:id', function(req, res, next) {
	if (!Number.isInteger(parseInt(req.params.id)) || parseInt(req.params.id) <= 0) return res.send(404);

	let required = require('../controllers/admin/' + req.params.controller);
	let controller = new required(res, req);

	controller.deleteAction(parseInt(req.params.id));
});

/* Вызов контроллера и передаваемого экшона с параметром id */
router.get('/:controller/:action/:id', function(req, res, next) {
	if (!Number.isInteger(parseInt(req.params.id)) || parseInt(req.params.id) <= 0) return res.send(404);
	console.log(req.params.id);

	let required = require('../controllers/admin/' + req.params.controller);
	let controller = new required(res, req);

	controller[req.params.action + 'Action'](parseInt(req.params.id));
});

module.exports = router;

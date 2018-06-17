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

/* Вызов контроллера и передаваемого экшона */
router.get('/:controller/:action', function(req, res, next) {
		let required = require('../controllers/admin/' + req.params.controller);
		let controller = new required(res, req);

		controller[req.params.action + 'Action']();
});

/* Вызов контроллера и передаваемого экшона с параметром id */
router.get('/:controller/:action/:id', function(req, res, next) {
		let required = require('../controllers/admin/' + req.params.controller);
		let controller = new required(res, req);

		if (parseInt(req.params.id) == NaN || parseInt(req.params.id) <= 0) throw 'id must be greater then zero';

		controller[req.params.action + 'Action'](parseInt(req.params.id));
});

module.exports = router;

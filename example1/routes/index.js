"use strict"
var express = require('express');
var router = express.Router();
var _ = require("underscore");

/* Вызов Index контроллера и Index экшона */
router.get('/', function(req, res, next) {
	// Проверка на Авторизацию
	// 
	let required = require('../controllers/admin/index');
	let controller = new required(req, res);

	req.indexAction();
	res.sendStatus(200);
});

/* Вызов контроллера и Index экшона */
router.get('/:controller/', function(req, res, next) {
	// Проверка на Авторизацию
	//  
	let required = require('../controllers/admin/' + req.params.controller);
	let controller = new required(req, res);

	if (typeof controller === 'undefined') {
		res.sendStatus(404);				
		return;
	}

	req.indexAction();
	res.sendStatus(200);
});

/* Вызов контроллера и передаваемого экшона */
router.get('/:controller/:action', function(req, res, next) {
	// Проверка на Авторизацию
	//  
	let required = require('../controllers/admin/' + req.params.controller);
	let controller = new required(req, res);

	if (typeof controller === 'undefined' || typeof controllers[req.params.action] !== 'function') {
		res.sendStatus(404);
		return;
	}

	controller[req.params.action + 'Action']();
	res.sendStatus(200);
});

/* Вызов контроллера и передаваемого экшона с параметром id */
router.get('/:controller/:action/:id', function(req, res, next) {
	// Проверка на Авторизацию
	//  
	let required = require('../controllers/admin/' + req.params.controller);
	let controller = new required(req, res);

	if (typeof controller === 'undefined' 
		|| typeof controllers[req.params.action] !== 'function' 
		|| parseInt(req.params.id) <= 0) {
		res.sendStatus(404);
		return;
	}

	controller[req.params.action + 'Action'](parseInt(req.params.id));
	res.sendStatus(200);
});

module.exports = router;

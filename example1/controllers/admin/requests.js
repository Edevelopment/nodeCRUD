"use strict"
var CrudController = require('./crud');
var RequestModel = require('../../models/request');
class RequestsController extends CrudController {
	constructor(res, req) {
		super(res, req);
		this.model = new RequestModel;
	}
}

module.exports = RequestsController;

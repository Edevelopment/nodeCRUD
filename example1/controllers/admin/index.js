"use strict"
var BaseController = require('./base.js');
class IndexController extends BaseController {
	indexAction() {	 
		console.log('test');
	}

	showAllowedHttpMethods() {
		this.view.sendAllowedHttpMethods();
	}
}

module.exports = IndexController;

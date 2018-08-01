"use strict"
var BaseController = require('./base.js');
class IndexController extends BaseController {
	showAllowedHttpMethods() {
		this.view.sendAllowedHttpMethods();
	}
}

module.exports = IndexController;

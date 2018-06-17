"use strict"
var BaseController = require('./base.js');
class IndexController extends BaseController {
	indexAction() {	 
		console.log('test');
	}
}

module.exports = IndexController;

"use strict"
var BaseController = require('base');
class PageController extends BaseController {
	getIndex() {
		console.log('test');
	}
}

module.exports = PageController;

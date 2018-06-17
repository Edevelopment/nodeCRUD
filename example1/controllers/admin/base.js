"use strict"
var BaseView = require('../../views/base.js');
class BaseController {
	constructor(res, req) {
		this.res = res;
		this.req = req;
		this.view = new BaseView(res);
	}
}

module.exports = BaseController;

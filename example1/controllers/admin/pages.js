"use strict"
var CrudController = require('./crud');
var PageModel = require('../../models/page');
class PagesController extends CrudController {
	constructor(res, req) {
		super(res, req);
		this.model = new PageModel;
	}

	sendTestMailAction() {
		this.model.sendMessageToAdmin();
		this.view.sendStatus(200);
	}
}

module.exports = PagesController;

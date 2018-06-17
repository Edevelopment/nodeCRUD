"use strict"
var CrudController = require('./crud');
var PageModel = require('../../models/page');
class PagesController extends CrudController {
	constructor(res, req) {
		super(res, req);

		this.editFields = {
			title: 'string',
			date : 'date',
			text : 'text',
		};

		this.model = new PageModel;
	}
}

module.exports = PagesController;

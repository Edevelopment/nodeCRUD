"use strict"
var CrudController = require('./crud');
var RequestTypeModel = require('../../models/request_type');
class Requests_typesController extends CrudController {
	constructor(res, req) {
		super(res, req);
		this.model = new RequestTypeModel;
	}

	arrayAction() {
		this.model.findAll((err, results, fields) => {
			if (err) { console.error(err);return;};
			let data = {};
			for (let key in results) {
				let result = results[key];
				data[result.id] = result.title;
			}
			this.view.send(data);
			this.model.db.end();
		});
	}

}

module.exports = Requests_typesController;

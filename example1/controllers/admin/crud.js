"use strict"
var BaseController = require('./base.js');
class CrudController extends BaseController {
	constructor(res, req) {
		super(res, req);
	}

	indexAction() {
		this.model.findAll((err, results, fields) => {
			if (err) { console.error(err);return;};
			this.view.send(results);
			this.model.db.end();
		});
	}

	listAction() {
		this.model.findFilteredData(this.req.query.filter, (err, results, fields) => {
			if (err) { console.error(err);return;};
			this.view.send(results);
			this.model.db.end();
		}, this.req.query.sort, this.req.query.per_page, this.req.query.page);	
	}

	createAction() {
		this.model.pullData(this.req.body).add((err, results, fields) => {	
			if (err) { 
				console.error(err);
				this.view.sendStatus(500);
				return;
			};
			this.view.sendStatus(200);
			this.model.db.end();
		}, () => {
			this.view.sendStatus(400);
			this.model.db.end();
		});
	}


	saveAction() {
		this.res.send('admin save');
	}

	readAction(id) {
		this.model.findOne(id, (err, results, fields) => {
			if (err) { console.error(err); return;};
			this.view.send(results);
			this.model.db.end();
		});
	}

	updateAction(id) {
		this.model.update(id, this.req.body, (err, results, fields) => {	
			if (err) { 
				console.error(err);
				this.view.sendStatus(500);
				return;
			};
			if (results.affectedRows > 0) {
				let result = {
					status: 'updated',
				};
				this.view.send(result);
			} else {
				this.view.sendStatus(200);
			}
			this.model.db.end();
		});
	}

	deleteAction(id) {
		this.model.delete(id, (err, results, fields) => {	
			if (err) { 
				console.error(err);
				this.view.sendStatus(500);
				return;
			};
			if (results.affectedRows > 0) {
				let result = {
					status: 'deleted',
				};
				this.view.send(result);
			} else {
				this.view.sendStatus(200);
			}
			this.model.db.end();
		}, () => {
			this.view.sendStatus(400);
			this.model.db.end();
		});
	}
}

module.exports = CrudController;

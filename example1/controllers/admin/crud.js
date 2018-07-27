"use strict"
var BaseController = require('./base.js');
class CrudController extends BaseController {
	constructor(res, req) {
		super(res, req);
	}

	listAction() {
		let filter = '';
		if (this.req.query.filter) {
			filter = this.model.prepareLikeRequest(this.req.query.filter);
		}
		this.model.findFilteredData(filter, (err, results, fields) => {
			if (err) { console.error(err);return;};
			this.view.send(results);
			this.model.db.end();
		}, this.req.query.sort, this.req.query.limit, this.req.query.page);	
	}

	createAction() {
		let form = new this.formParser.IncomingForm();
		form.parse(this.req, (err, fields, files) => {
			this.model.pullFiles(files, fields, (fields) => {
				this.model.pullData(fields).add((err, results, fields) => {	
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
			}, () => {
				this.view.sendStatus(500);
				this.model.db.end();
			});
		});
	}


	saveAction() {
		this.res.send('admin save');
	}

	readAction(id) {
		this.model.findOne(id, (err, results, fields) => {
			if (err) { console.error(err); return;};

			if (results.length == 0) {
				this.res.send(404); return this.res.end();
			};

			this.view.send(results);
			this.model.db.end();
		});
	}

	updateAction(id) {
		this.model.pullData(this.req.body).update(id, (err, results, fields) => {	
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

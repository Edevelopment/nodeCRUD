"use strict"
var CrudController = require('./crud');
var RequestModel = require('../../models/request');
class RequestsController extends CrudController {
	constructor(res, req) {
		super(res, req);
		this.model = new RequestModel;
	}

	listAction() {
		let filter = '1=1';
		this.globalUserModel.findOne('hash=' + this.model.db.escape(this.req.headers['x-auth']), (err, results, fields) => {
			if (err) { console.error(err); this.res.send(401); return this.res.end();};

			if (results.length == 0) {
				this.res.send(401); return this.res.end();
			};

			if (results.roles == 'user') {
				filter = 'user_id=' + results.id;
			}

			if (this.req.query.filter) {
				filter += ' AND ';
				filter += this.model.prepareLikeRequest(this.req.query.filter);
			}

			this.model.findFilteredData(filter, (err, results, fields) => {
				if (err) { console.error(err);return;};
				this.view.send(results);
				this.model.db.end();
			}, this.req.query.sort, this.req.query.limit, this.req.query.page);	
		});
	}


	createAction() {
		this.globalUserModel.findOne('hash=' + this.model.db.escape(this.req.headers['x-auth']), (err, results, fields) => {

			if (err) { console.error(err); this.res.send(401); return this.res.end();};

			if (results.length == 0) {
				this.res.send(401); return this.res.end();
			};

			if (results.roles == 'admin') {
				this.res.send(401); return this.res.end();
			}

			let data = this.req.body;
			data['user_id'] = results.id;

			this.model.pullData(data).add((err, results, fields) => {	
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
		});
	}

	readAction(id) {
		this.globalUserModel.findOne('hash=' + this.model.db.escape(this.req.headers['x-auth']), (err, results, fields) => {

			if (err) { console.error(err); this.res.send(401); return this.res.end();};

			if (results.length == 0) {
				this.res.send(401); return this.res.end();
			};

			let where = '';
			if (results.roles == 'admin') {
				where = id;
			} else {
				where = 'id = ' + id + ' AND user_id = ' + results.id;
			}

			this.model.findOne(where, (err, results, fields) => {
				if (err) { console.error(err); return;};
		
				if (results.length == 0) {
					this.res.send(404); return this.res.end();
				};

				this.view.send(results);
				this.model.db.end();
			});
		});
	}
}

module.exports = RequestsController;

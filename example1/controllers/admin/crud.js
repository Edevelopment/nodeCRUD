"use strict"
var BaseController = require('./base.js');
class CrudController extends BaseController {
	constructor(res, req) {
		super(res, req);
	}

	indexAction() {
		this.model.db.query('SELECT * FROM pages ', (err, results, fields) => {	
			if (err) { 
				console.error(err);
				return;
			};
			this.view.render('index', results);
			this.model.db.end();
		});
	}

	createAction() {
		this.res.send('admin create');
	}

	saveAction() {
		this.res.send('admin save');
	}

	readAction(id) {
		console.log(this.req.session.views);
		if (this.req.session.views) {
			this.req.session.views++;
			this.res.set('Access-Control-Allow-Origin', 'http://localhost:8084');
			this.res.set('Access-Control-Allow-Credentials', 'true');
			this.res.type('json');
			this.res.json();
		} else {
			this.req.session.views = 1
			this.res.set('Access-Control-Allow-Origin', 'http://localhost:8084');
			this.res.set('Access-Control-Allow-Credentials', 'true');
			this.res.type('json');
			this.res.json();
		}
	}

	editAction(id) {
		this.res.send('admin edit ' + id);
	}

	updateAction(id) {
		this.res.send('admin update');
	}

	deleteAction(id) {
		this.res.send('admin delete');
	}
}

module.exports = CrudController;

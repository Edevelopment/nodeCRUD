"use strict"
var CrudController = require('./crud.js');
var UserModel = require('../../models/user');
class UserController extends CrudController {

	constructor(res, req) {
		super(res, req);
		this.model = new UserModel;
	}

	loginAction() {
		if (typeof this.req.body['email'] === 'undefined' || typeof this.req.body['password'] === 'undefined') {
			this.res.sendStatus(401);
			return;
		}

		// берем логин и пароль, сравниваем с бд
		this.model.login(this.req.body['email'], this.req.body['password'], (err, result, fields) => {
			this.model.db.end();

			// если не находим, то отдаем 401
			if (err) { console.error(err); this.view.sendStatus(401); return this.res.end();};

			if (result.length == 0) {this.view.sendStatus(401); return this.res.end();};

			// если находим то даем хеш
			return this.view.send({token: result.hash});
		}, () => {this.view.sendStatus(401); return this.res.end();});
	}

	listAction() {
		let filter = '1=1';
		this.globalUserModel.findOne('hash=' + this.model.db.escape(this.req.headers['x-auth']), (err, results, fields) => {
			if (err) { console.error(err); this.res.send(401); return this.res.end();};

			if (results.length == 0) {
				this.res.send(401); return this.res.end();
			};

			if (results.roles == 'user') {
				this.res.send(401); return this.res.end();
			}
			if (results.roles == 'admin') {
				filter = 'roles=\'user\'';
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

	checkAuth(next) {
		if (typeof this.req.headers['x-auth'] !== 'string') {this.res.send(401);  return this.res.end();};

		this.model.findOne('hash=' + this.model.db.escape(this.req.headers['x-auth']), (err, results, fields) => {
			this.model.db.end();

			if (err) { console.error(err); this.res.send(401); return this.res.end();};

			if (results.length == 0) {
				this.res.send(401); return this.res.end();
			};

			next();
		});
	}

	// Отдаем данные о юзере по хешу
	cabinetAction() {
		this.model.findOne('hash=' + this.model.db.escape(this.req.headers['x-auth']), (err, results, fields) => {
			if (err) { console.error(err); return;};
			this.view.send(results);
			this.model.db.end();
		});
	}
}

module.exports = UserController;

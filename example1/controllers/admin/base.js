"use strict"
var BaseView = require('../../views/base.js');
var UserClass = require('../../models/user.js')
class BaseController {
	constructor(res, req) {
		this.res = res;
		this.req = req;
		this.view = new BaseView(res);
		this.globalUserModel = new UserClass;
	}

	checkIsAdmin(callback) {
		this.globalUserModel.findOne('hash=' + this.model.db.escape(this.req.headers['x-auth']), (err, results, fields) => {
			if (err) { console.error(err); this.res.send(401); return this.res.end();};

			if (results.length == 0) {
				this.res.send(401); return this.res.end();
			};

			if (results.roles != 'admin') {
				this.res.send(401); return this.res.end();
			}

			callback();
		});
	}

	checkIsnotAdmin(callback) {
		this.globalUserModel.findOne('hash=' + this.model.db.escape(this.req.headers['x-auth']), (err, results, fields) => {
			if (err) { console.error(err); this.res.send(401); return this.res.end();};

			if (results.length == 0) {
				this.res.send(401); return this.res.end();
			};

			if (results.roles == 'admin') {
				this.res.send(401); return this.res.end();
			}

			callback();
		});
	}	
}

module.exports = BaseController;

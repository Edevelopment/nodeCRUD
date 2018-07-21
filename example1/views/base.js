"use strict"
var lang = require('../lang/ru');

class BaseView {
	constructor(res) {
		this.res = res;

		this.res.set('Access-Control-Allow-Origin', 'http://four-d-home-sandbernar.c9users.io:8081');
		this.res.set('Access-Control-Allow-Credentials', 'true');

		this.lang = lang;
	};

	sendStatus(message) {
		this.res.sendStatus(message);
	}

	send(message) {
		this.res.json(message);
	}

	sendAllowedHttpMethods() {
		this.res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
		this.res.set('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, x-auth');

		this.sendStatus(200);
	}
}

module.exports = BaseView;

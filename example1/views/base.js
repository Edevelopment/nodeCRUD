"use strict"
var lang = require('../lang/ru');

class BaseView {
	constructor(res) {
		this.res = res;

		this.res.set('Access-Control-Allow-Origin', 'http://localhost:8084');
		this.res.set('Access-Control-Allow-Credentials', 'true');

		this.lang = lang;
	};

	sendStatus(message) {
		this.res.sendStatus(message);
	}

	send(message) {
		this.res.json(message);
	}
}

module.exports = BaseView;
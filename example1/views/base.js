"use strict"
var lang = require('../lang/ru');

class BaseView {
	constructor(res, layout) {
		if (typeof layout === 'undefined') {
			layout = 'baselayout';
		}

		this.layout = layout;
		this.res = res;
		this.lang = lang;
	};

	render(template, data) {
		this.res.set('Access-Control-Allow-Origin', 'http://localhost:8084');
		this.res.set('Access-Control-Allow-Credentials', 'true');
		this.res.type('json');
		this.res.json(data);
	};
}

module.exports = BaseView;
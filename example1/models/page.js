"use strict"
var BaseModel = require('./basemodel');
class PageModel extends BaseModel {
    constructor() {
    	super();

		this.pullFields = {
			title: 'string',
			description : 'description',
			text : 'text',
		};

		this.pushFields = {
			title: 'string',
			description : 'description',
			text : 'text',
		};

    	this.tablename = 'pages';
    }
}

module.exports = PageModel;

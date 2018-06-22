"use strict"
var CrudModel = require('./crudmodel');

class PageModel extends CrudModel {
    constructor() {
    	super();

		this.pullFields = {
			title: 'string',
			description : 'description',
			text : 'text',
		};

		this.pushFields = {
			id: 'integer',
			title: 'string',
			description : 'description',
			text : 'text',
		};

    	this.tablename = 'pages';
    }


}

module.exports = PageModel;

"use strict"
var CrudModel = require('./crudmodel');

class RequestType extends CrudModel {
    constructor() {
    	super();

		this.pullFields = {
			title: 'string',
		};

		this.pushFields = {
			id: 'integer',
			title: 'string',
		};

    	this.tablename = 'ru_requests_types';
    }
}

module.exports = RequestType;

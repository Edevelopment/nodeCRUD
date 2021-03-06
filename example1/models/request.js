"use strict"
var CrudModel = require('./crudmodel');

class RequestModel extends CrudModel {
    constructor() {
    	super();

		this.pullFields = {
			type: 'integer',
			title: 'string',
			text: 'text',
			status: 'integer',
			user_id: 'integer',
			finish_date: 'date',
		};

		this.pushFields = {
			id: 'integer',
			type: 'integer',
			title: 'string',
			text: 'text',
			status: 'integer',
			user_name: 'integer',
			finish_date: 'date',
		};

    	this.tablename = 'ru_requests';
    }

    pushStatusValue(value) {
    	let statuses = {
    		0: 'Новая заявка',
    		1: 'Назначено',
    		2: 'Выполнено'
    	};

    	if (typeof statuses[value] === 'string') {
    		return statuses[value];
    	}

    	return value;
    }
}

module.exports = RequestModel;

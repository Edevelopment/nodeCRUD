"use strict"
var CrudModel = require('./crudmodel');

class NotificationModel extends CrudModel {
    constructor() {
    	super();

		this.pullFields = {
			title: 'string',
			image : 'image',
			text : 'text',
		};

		this.pushFields = {
			id: 'integer',
			title: 'string',
			image : 'image',
			text : 'text',
		};

    	this.tablename = 'ru_notitfications';
    }


}

module.exports = NotificationModel;

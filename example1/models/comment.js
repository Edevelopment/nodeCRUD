"use strict"
var CrudModel = require('./crudmodel');

class CommentModel extends CrudModel {
    constructor() {
    	super();

		this.pullFields = {
			text : 'text',
			user_id: 'integer',
			notification_id : 'integer',
		};

		this.pushFields = {
			id: 'integer',
			created: 'date',
			text : 'text',
			user_id: 'integer',
			notification_id : 'integer',
		};

    	this.tablename = 'ru_comments';
    }


}

module.exports = CommentModel;

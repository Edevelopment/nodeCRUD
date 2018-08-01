"use strict"
var CrudModel = require('./crudmodel')

class TeamModel extends CrudModel {
	constructor() {
		super();

		this.pullFields = {
			name: 'string',
			phone: 'string',
			position: 'string',
			time_work: 'string',
			avatar: 'text',
			email: 'string',
		};

		this.pushFields = {
			id: 'integer',
			name: 'string',
			phone: 'string',
			position: 'string',
			time_work: 'string',
			email: 'string',
			avatar: 'text',
		};

		this.pullFilesFields = {
			avatar: 'images',
		}


		this.tablename = 'ru_teams';

	}

}

module.exports = TeamModel; 
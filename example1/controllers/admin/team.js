"use strict"
var CrudController = require('./crud');
var TeamModel = require('../../models/team');
class TeamController extends CrudController {
	constructor(res, req) {
		super(res, req);
		this.model = new TeamModel;
	}

	createAction() {
		this.globalUserModel.findOne('hash=' + this.model.db.escape(this.req.headers['x-auth']), (err, results, fields) => {

			if (err) { console.error(err); this.res.send(401); return this.res.end();};

			if (results.length == 0) {
				this.res.send(401); return this.res.end();
			};

			if (results.roles == 'user') {
				this.res.send(401); return this.res.end();
			}

			let data = this.req.body;
			data['user_id'] = results.id;
			
			this.model.pullFiles(data, (data) => {
				console.log(data);
				this.model.pullData(data).add((err, results, fields) => {	
					if (err) { 
						console.error(err);
						this.view.sendStatus(500);
						return;
					};
					this.view.sendStatus(200);
					this.model.db.end();
				}, () => {
					this.view.sendStatus(400);
					this.model.db.end();
				});
			}, () => {
				this.view.sendStatus(500);
				this.model.db.end();		
			})
		});
	}
}

module.exports = TeamController;

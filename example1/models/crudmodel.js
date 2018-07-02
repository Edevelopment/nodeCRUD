"use strict"
var BaseModel = require('./basemodel');
class CrudModel extends BaseModel{
	findFilteredData(where, callback, orderBy, limit, page) {

		if (typeof orderBy !== 'undefined' && orderBy.length) {
	    	orderBy = this.buildOrderBy(orderBy);
		}

	    limit = parseInt(limit);
	    if (isNaN(limit) || limit <= 0) {
	        limit = 1000;
	    }

	    page = parseInt(page);
	    if (isNaN(page) || page <= 0) {
	        page = 1;
	    }

	    let offset = limit * (page - 1);

	    where = this.prepareLikeRequest(where);

	    let sql = this.prepareFindByQuery(where, orderBy, limit, offset) 
	            + '; ' + 
	            this.prepareCountQuery(where);

	    this.db.query(sql, (err, results, fields) => {
	        let data = this.prepareFindByResults(results[0]);
	        let count = this.getCountResult(results[1]);

	        let response = {
	            data: data,
	            total: count,
	            last_page: Math.ceil(count / limit),
	            from: (page * limit) - limit + 1,
	            to: (page * limit),
	            per_page: limit,
	            current_page: page,
	        };

	        callback(err, response, fields);
	    });
	}

	buildOrderBy(frontEndOrderBy) {
		let piecesOrderBy = frontEndOrderBy.split('|');
		if (piecesOrderBy.length !== 2) return '';

		if (!this.pushFields.hasOwnProperty(piecesOrderBy[0])) return '';
		if (piecesOrderBy[1] !== 'desc' && piecesOrderBy[1] !== 'asc') return '';

		return piecesOrderBy[0] + ' ' + piecesOrderBy[1];
	}

	sendMessageToAdmin() {
		this.helpers.mail.send('eduardeliseev.m@gmail.com', 'Hello Bro!', '<h1>HEEEEE<sup>LLLL</sup>OO!!</h2>');
	}
}

module.exports = CrudModel;

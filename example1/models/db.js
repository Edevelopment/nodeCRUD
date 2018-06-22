"use strict"
class DB {
	constructor() {
        this.pullFields = {};
	    this.connectToDB();
	}

	prepareFindByResults(rows) {
        let results = [];

        for (let row in rows) {

            let entity = this.pushData(rows[row]);
            results.push(entity);
        }

        return results;
    }

    prepareCountQuery(where) {
    	if (typeof where === 'undefined') {
    		where = '1=1';
    	}

        return 'SELECT COUNT(*) as count FROM ' + this.tablename + ' WHERE ' + where;
    }

    prepareFindByQuery(where, orderBy, limit, offset) {
        if (typeof orderBy === 'undefined' || orderBy.length == 0) {
            orderBy = 'id ASC';
        }

        if (typeof where === 'number') {
            where = 'id = ' + where;
        } else if (where.length == 0) {
        	where = '1=1';
        }

        if (typeof limit === 'undefined') {
            limit = 1000;
        }

        if (typeof offset == 'undefined') {
            offset = 0;
        }

        return 'SELECT * FROM ' + this.tablename + ' WHERE ' + where + ' ORDER BY ' + orderBy + ' LIMIT ' + limit + ' OFFSET ' + offset;
    }

    findBy(where, callback, orderBy, limit, offset) {
        this.db.query(this.prepareFindByQuery(where, orderBy, limit, offset), (err, rows, fields) => {
            let results = this.prepareFindByResults();

            callback(err, results, fields);
        });
    }

    findOne(where, callback) {
        this.findBy(where, callback, '', 1);
    }

    findAll(callback, orderBy) {
        this.findBy('1=1', callback, orderBy);
    }

    getCountResult(results) {
    	return results[0].count;
    }

    connectToDB() {
        let settings = require('../configs.json')[process.env.NODE_ENV];

        this.db = require('mysql').createConnection(settings);
        this.db.connect();
    }

    desctuctor() {
        this.db.end();
    }

    add(callback, errCallback) {
        this.db.query('INSERT INTO ' + this.tablename + ' SET ?', this.pullFields, (err, results, fields) => {callback(err, results, fields)});
    }

    delete(id, callback, errCallback) {
        this.db.query('DELETE FROM ' + this.tablename + ' WHERE id = ' + id, (err, results, fields) => {callback(err, results, fields)});
    }

    update(id, data, callback) {
        let subquery = Object.keys(data).join(' = ?, ');
        subquery += ' = ?';
        let query = 'UPDATE ' + this.tablename + ' SET ' + subquery + ' WHERE id = ?';
        let insertedData = Object.values(data);
        insertedData.push(id);
        this.db.query(query, insertedData, (err, results, fields) => {callback(err, results, fields)});
    }

    prepareLikeRequest(searchString) {
    	if (searchString.length == 0) return '1=1';

    	searchString = '%' + searchString + '%';
    	searchString = this.db.escape(searchString);

    	let sql = '';
    	
    	for (let field in this.pullFields) {
			sql += ' LOWER(' + field + ') LIKE ' + searchString.toLowerCase() + ' OR ';
    	}

    	sql = sql.slice(0, -3);

    	return sql;
    }
}

module.exports = DB;

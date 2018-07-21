"use strict"
var CrudModel = require('./crudmodel');
class 	UserModel extends CrudModel {
    constructor() {
    	super();

		this.pullFields = {
			title: 'string',
			email: 'string',
			phone: 'string',
			active: 'bool',
			contact_name: 'string',
			contact_email: 'string',
			contact_phone: 'string',
			password: 'password',
			people_no: 'integer',
			flat_no: 'string',
			flat_size: 'integer',
			roles: 'integer',
		};

		this.pushFields = {
			id: 'integer',
			title: 'string',
			email: 'string',
			phone: 'string',
			hash: 'string',
			contact_name: 'string',
			contact_email: 'string',
			contact_phone: 'string',
			people_no: 'integer',
			flat_no: 'string',
			flat_size: 'integer',
			roles: 'integer',
		};

    	this.tablename = 'ru_users';

        let bcrypt = require('bcrypt');
        this.helpers.bcrypt = bcrypt;
    }

    login(email, password, callback, errCallback) {
    	this.db.query('SELECT * FROM ru_users WHERE email = ?', [email], (err, results, fields) => {
    		this.pushFields['password'] = 'password';
	        let data = this.prepareFindByResults(results, 1);
	        console.log(data.password);
	        this.helpers.bcrypt.compare(password, data.password, (err, res) => {
				if (err) { console.error(err); return errCallback()};
				if (!res) return errCallback();
				callback(err, data, fields);
	        })
    	});
    }

    // не сработает
	generatePassword(callback) {
    	let saltRounds = 10;
    	this.helpers.bcrypt.hash(this.pulledData.password, saltRounds, (err, hash) => {
    		this.pulledData.password = hash;
    		callback();	
    	})
    }

    add(callback, errCallback) {
    	this.addCreatedData();
    	this.generatePassword(() => {
        	this.db.query('INSERT INTO ' + this.tablename + ' SET ?', this.pulledData, (err, results, fields) => {callback(err, results, fields)});
    	});
    }

    update(id, callback) {
    	this.generatePassword(() => {
	        let subquery = Object.keys(this.pulledData).join(' = ?, ');
	        subquery += ' = ?';

	        let query = 'UPDATE ' + this.tablename + ' SET ' + subquery + ' WHERE id = ?';
	        let insertedData = Object.values(this.pulledData);

	        insertedData.push(id);
	        let queried = this.db.query(query, insertedData, (err, results, fields) => {callback(err, results, fields)});
	    });
    }
}

module.exports = UserModel;

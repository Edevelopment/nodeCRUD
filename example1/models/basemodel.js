"use strict"
class BaseModel{
    constructor() {
        this.pullFields = {};
        this.connectToDB();
    }

    // Подготовка данных для отображения
    pushValue(field, value) {
        return value;
    }

    // Подготовка данных для сохранения
    pullValue(field, value) {
        this.pullFields[field] = value;
        return this;
    }

	// Так выглядит геттер
	get name() {
		return '';
	}

	// Так выглядит сеттер
	set name(newName) {
		this.name = newName;
	}

    connectToDB() {
        let settings = require('../configs.json')[process.env.NODE_ENV];

        this.db = require('mysql').createConnection(settings);
        this.db.connect();
    }

    desctuctor() {
        this.db.end();
    }

    findAll(callback, orderBy) {
        this.findBy('1=1', callback, orderBy);
    }

    findBy(where, callback, orderBy, limit, offset) {
        if (typeof orderBy === 'undefined' || orderBy.length == 0) {
            orderBy = 'id ASC';
        }

        if (typeof where === 'number') {
            where = 'id = ' + where;
        }

        if (typeof limit === 'undefined') {
            limit = 1000;
        }

        if (typeof offset == 'undefined') {
            offset = 0;
        }


        this.db.query('SELECT * FROM ' + this.tablename + ' WHERE ' + where + ' ORDER BY ' + orderBy + ' LIMIT ' + limit + ' OFFSET ' + offset, (err, rows, fields) => {
            let results = [];

            for (let row in rows) {

                let entity = this.pushData(rows[row]);
                results.push(entity);
            }

            callback(err, results, fields);
        });
    }

    findOne(where, callback) {
        this.findBy(where, callback, '', 1);
    }

    pullData(data) {
        for (let key in data) {

            if (!this.pullFields.hasOwnProperty(key)) continue;
            this.pullValue(key, data[key]);
        }

        return this;
    }

    pushData(data)  {
        let result = {};

        for (let key in this.pushFields) {

            if (!this.pullFields.hasOwnProperty(key)) continue;
            result[key] = this.pushValue(key, data[key]);
        }

        return result;
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

    // Функция для проверки чего-то там
    checkDataFields(data) {
        return true;
    }
}

module.exports = BaseModel;

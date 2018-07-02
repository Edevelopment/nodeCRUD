"use strict"
var DB = require('./db');
class BaseModel extends DB{
    constructor() {
        super();
        this.addHelpers();
    }

    addHelpers() {
        this.helpers = {};

        let moment = require('moment');
        this.helpers.dateTime = moment;

        this.helpers.strings = require('../helpers/strings');
        this.helpers.mail = require('../helpers/mail');
    }


    // Подготовка данных для отображения
    pushValue(field, value) {
        if (typeof this['push' + this.helpers.strings.ucfirst(field) + 'Value'] === 'function') {
            value = this['push' + this.helpers.strings.ucfirst(field) + 'Value'](value);
        }

        return value;
    }

    // Подготовка данных для сохранения
    pullValue(field, value) {
        if (typeof this['pull' + this.helpers.strings.ucfirst(field) + 'Value'] === 'function') {
            value = this['pull' + this.helpers.strings.ucfirst(field) + 'Value'](value);
        }

        this.pulledData[field] = value;
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

    pullData(data) {
        for (let key in data) {

            if (!this.pullFields.hasOwnProperty(key)) continue;

            this.pullValue(key, data[key]);
        }

        let dt = new this.helpers.dateTime();
        this.pullValue('updated', dt.format('x'));

        return this;
    }   

    pushData(data)  {
        let result = {};

        for (let key in this.pushFields) {

            if (!this.pushFields.hasOwnProperty(key)) continue;
            result[key] = this.pushValue(key, data[key]);
        }

        return result;
    }

    addCreatedData() {
        let dt = new this.helpers.dateTime();
        this.pullValue('created', dt.format('x'));
        return this;
    }
}

module.exports = BaseModel;

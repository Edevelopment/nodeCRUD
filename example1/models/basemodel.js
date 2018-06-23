"use strict"
var DB = require('./db');
class BaseModel extends DB{
    constructor() {
        super();
    }

    // Подготовка данных для отображения
    pushValue(field, value) {
        return value;
    }

    // Подготовка данных для сохранения
    pullValue(field, value) {
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

        this.pullValue('updated', this.dateTime.create().now());

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
        this.pullValue('created', this.dateTime.create().now());
        return this;
    }
}

module.exports = BaseModel;

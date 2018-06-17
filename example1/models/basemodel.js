"use strict"
class BaseModel{
    constructor() {
        this.connectToDB();
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
        let settings = {
            host: '127.0.0.1',
            database: 'nodedb',
            user: 'root',
            password: ''
        };
        this.db = require('mysql').createConnection(settings);
        this.db.connect();
    }

    desctuctor() {
        this.db.end();
    }
}

module.exports = BaseModel;

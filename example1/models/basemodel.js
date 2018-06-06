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
        settings = {
            host: 'mysql55',
            database: 'nodedb',
            user: 'root',
            password: ''
        };
        this.qb = require('node-querybuilder').QueryBuilder(settings, 'mysql', 'single');
    }
}
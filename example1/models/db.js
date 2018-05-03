class DB {
    constructor() {
        this.connectToDB();
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
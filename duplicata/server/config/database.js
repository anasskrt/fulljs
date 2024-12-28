const sql = require('mysql');

class Database {
    connection;
    constructor() {
        this.connection = sql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'granule'
        });
    }  
}

module.exports = Database;

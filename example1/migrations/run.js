"use strict"
var fs = require('fs');
// берем список всех файлов в папке queries
var migrationsFiles = fs.readdirSync('./queries');

// подключаемся к базе
let mysql = require('mysql');
var con = mysql.createConnection(require('../configs.json')['db'][process.env.NODE_ENV]);

con.connect(function(err) {
	if (err) throw err;

	runMigrations(() => {
		console.log('All migrations executed!');
		con.end();
	});
})

function runMigrations(callback) {
	// выполняем запросы по одному
	for (let migrationFileKey in migrationsFiles) {
		if (migrationFileKey == migrationsFiles.length - 1) {
			executeMigration(migrationsFiles[migrationFileKey], callback);
		} else {
			executeMigration(migrationsFiles[migrationFileKey]);
		}
	}
}

function executeMigration(migrationFile, callback) {

	// проверяем был ли запрос уже выполнен, делая запрос в таблицу migrations
	con.query('SELECT * FROM migrations WHERE name = ?', [migrationFile] 	, (err, results, fields) => {
		if (results.length >= 1) return callback();

		fs.readFile('./queries/' + migrationFile, (err, migrationQuery) => {
			if (err) throw err;
			con.query(migrationQuery.toString(), (err, results, fields) => {
				if (err) throw err;
				con.query('INSERT INTO `migrations` SET ?', {name: migrationFile}, (err, results, fields) => {
					if (err) throw err;
					console.log(migrationFile + ' executed');
					if (typeof callback === 'function') {
						callback();
					}
				})
			});
		});
	});
}
var mysql = require('mysql');
var settings = require('./settings.json');
var db;

function connectDatabase() {
    if (!db) {
        db = mysql.createConnection(settings);

        db.connect(function (err) {
            if (!err) {
                console.log('Connected to MySql database!');
            } else {
                console.log('Error connecting MySql database!');
            }
        });
    }
    return db;
}

module.exports = connectDatabase();
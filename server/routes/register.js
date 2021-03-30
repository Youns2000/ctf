const router = require('express').Router();
var mysql = require('mysql');
const connect = require('../db/db')

connect.query('SELECT * FROM users', function (err, rows, fields) {
    if (err) throw err;
    var tmp = rows[0].name;

    router.get('/register', (req, res) => {
        res.send({ tmp });
    });
    console.log(tmp)
});
connect.end()

module.exports = router;
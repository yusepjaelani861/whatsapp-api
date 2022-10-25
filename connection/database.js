const mysql = require('mysql');
const config = require('../config.json');

const connection = mysql.createConnection({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database
})

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
})

module.exports = connection;
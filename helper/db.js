const config = require('../config.json');
const mysql = require('mysql2-promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    // connect to db
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password, database });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    const sequelize = new Sequelize(database, user, password, {
        dialect: 'mysql',
    })

    db.User = require('../models/users/user.model')(sequelize);

    // sync all models with database
    await sequelize.sync();
}
const db = require('../connection/database');

async function queryDB(query) {
    return new Promise((resolve, reject) => {
        db.query(query, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

module.exports = queryDB;
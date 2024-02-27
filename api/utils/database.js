const mysql = require("mysql2");

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'disp-eval-js',
    password: '',
})

module.exports = pool.promise();
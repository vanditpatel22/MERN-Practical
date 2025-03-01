const mysql = require('mysql')

const configuration = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
};

const con = mysql.createPool(configuration);

module.exports = con;
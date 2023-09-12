var mysql = require("mysql2");
require("iconv-lite").encodingExists("foo");
const dotenv = require("dotenv");
dotenv.config();
const dbcon = mysql.createPool({
    host: process.env.HOST,
    database: process.env.DB,
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    connectionLimit: 10,
});

module.exports = dbcon;

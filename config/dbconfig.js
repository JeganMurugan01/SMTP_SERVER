const mysql= require('mysql2')

 const dbcon=mysql.createPool({
    host: 'localhost',
    database:"SMTP",
    user: 'root',
    password:'root',
    connectionLimit:10,
})

module.exports = dbcon
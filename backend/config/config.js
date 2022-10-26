const mysql = require('mysql');
require('dotenv').config({path: __dirname + '/../.env'});


// create Connection
const db = mysql.createConnection({
    host : process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password : process.env.MYSQL_PASS,
    database : process.env.MYSQL_DB

})

db.connect((err)=>{
    if(err){
        console.log(err);
        return console.log("DB Connection failed");

    }
    console.log("DB connected Successfully");
})

module.exports = db;

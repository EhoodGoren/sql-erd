require('dotenv').config();
const mysql = require("mysql2");

const { MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, MYSQL_ROOT_PASSWORD } = process.env;
const mysqlConfig = {
  host: MYSQL_DATABASE,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_ROOT_PASSWORD,
};

// Connecting to mysql container
const con = mysql.createConnection(mysqlConfig);
con.connect(function (err) {
  if (err) throw err;
  console.log("connected");
});

module.exports = con;

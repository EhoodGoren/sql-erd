require('dotenv').config();
const express = require("express");
const mysql = require("mysql2");

// Should be kept as environment variable
const { MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, MYSQL_ROOT_PASSWORD } = process.env;
const mysqlConfig = {
  host: MYSQL_DATABASE,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_ROOT_PASSWORD,
};

const port = process.env.PORT || 3000;

// Connecting to mysql container
const con = mysql.createConnection(mysqlConfig);
con.connect(function (err) {
  if (err) throw err;
  console.log("connected");
});

const app = express();

app.get("/", function (req, res) {
  res.send("Testing my server");
});

//  Creating first table "numbers"
app.get("/create-table", function (req, res) {
  const sql = `
    CREATE TABLE IF NOT EXISTS numbers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      number INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=INNODB;
  `;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send("numbers table created");
  });
});

// Adding a random number to "numbers" table
app.get("/insert", function (req, res) {
  const number = Math.round(Math.random() * 100);
  const sql = `INSERT INTO numbers (number) VALUES (${number})`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(`${number} inserted into table`);
  });
});

// Fetching number's table
app.get("/fetch", function (req, res) {
  const sql = `SELECT * FROM numbers`;
  con.query(sql, function (err, result, fields) {
    console.log(result);
    if (err) throw err;
    res.send(JSON.stringify(result));
  });
});

app.listen(port, () => {
  console.log(`running on ${port}`);
});

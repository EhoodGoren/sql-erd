const express = require("express");
const con = require('./sql-connection');
const getRouter = require('./routers/getRouter');
const postNewRouter = require('./routers/postNewRouter');
const updateRouter = require('./routers/updateRouter');
const removeRouter = require('./routers/removeRouter');

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json())

app.get("/", function (req, res) {
  res.send("Testing my server");
});

app.use('/get', getRouter);
app.use('/new', postNewRouter);
app.use('/update', updateRouter);
app.use('/remove', removeRouter);

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

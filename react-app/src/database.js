var mysql = require('mysql');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json())

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Hope8109",
  database: "ITSC4155"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  //Create database if it doesn't already exist
  try {
    con.query("USE ITSC4155");
  } catch (error) {
    con.query("CREATE DATABASE ITSC4155", function (err, result) {
      if (err) throw err;
          console.log("Database created");
    });
    con.query("CREATE TABLE login (email VARCHAR(255), password VARCHAR(255))", function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
  }
});

app.post('/users', (req, res) => {
  console.log("request received")
  const email = req.body.key1;
  const password = req.body.key2;
  const query = 'INSERT INTO login (email, password) VALUES (?, ?)';

  con.query(query,[email, password],(err, result) => {
    if (err) {
      console.log('Error creating user');
      return res.status(500).json({ error: 'User creation failed' });
    }
    res.status(201).json({ id: result.insertId });
  });
});

app.delete('/delete/:email/:password', (req, res) => {
  const email = req.params.email;
  const password = req.params.password;
  const query = 'DELETE FROM login WHERE email = ? AND password = ?';

  con.query(query,[email, password],(err, result) => {
    if (err) {
      console.log('Error deleting user');
    }
  });
});

app.listen(port, () => {
  console.log('Server running on http://localhost:' + port);
});
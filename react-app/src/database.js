var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Hope8109",
  database: "ITSC4155"
});

con.connect(function(err) {
  if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE ITSC4155", function (err, result) {
        if (err) throw err;
            console.log("Database created");
    });
    con.query("CREATE TABLE login (user VARCHAR(255), password VARCHAR(255))", function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
});

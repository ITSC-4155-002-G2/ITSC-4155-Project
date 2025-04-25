var mysql = require('mysql');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json())

var con = mysql.createConnection({
  host: "localhost",
  user: "root",  //  MySQL username
  password: "Hope8109",  // MySQL password
  database: "ITSC4155",  //  database name
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

app.post('/create', (req, res) => {
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

app.get('/login', (req, res) => {
  const { key1: email, key2: password } = req.body;
  const query = 'SELECT * FROM login WHERE email = ? AND password = ?';

  con.query(query, [email, password], (err, results) => {
    if (err) {
      console.log('Error during login', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length > 0) {
      // Successful login
      res.status(200).json({ message: 'Login successful' });
    } else {
      // Invalid credentials
      res.status(401).json({ error: 'Invalid email or password' });
    }
  });
});

// Update password route
app.put('/update-password', (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  // Check if all fields are provided
  if (!email || !oldPassword || !newPassword) {
    return res.status(400).json({ error: 'Please provide email, old password, and new password.' });
  }

  // Check if user exists with the old password
  const checkUserQuery = 'SELECT * FROM login WHERE email = ? AND password = ?';
  
  con.query(checkUserQuery, [email, oldPassword], (err, results) => {
    if (err) {
      console.log('Error checking user', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(400).json({ error: 'Old password is incorrect or user not found.' });
    }

    // Update password if old password matches
    const updatePasswordQuery = 'UPDATE login SET password = ? WHERE email = ?';
    
    con.query(updatePasswordQuery, [newPassword, email], (err, result) => {
      if (err) {
        console.log('Error updating password', err);
        return res.status(500).json({ error: 'Failed to update password' });
      }

      res.status(200).json({ message: 'Password updated successfully.' });
    });
  });
});


app.delete('/delete', (req, res) => {
  
  const email = req.body.key1;
  const password = req.body.key2;
  const query = 'DELETE FROM login WHERE email = ? AND password = ?';
  console.log(email + "" + password);
  con.query(query,[email, password],(err, result) => {
    if (err) {
      console.log('Error creating user');
      return res.status(500).json({ error: 'User creation failed' });
    }
    return res.status(201).json({ id: result.insertId });
  });
});

app.listen(port, () => {
  console.log('Server running on http://localhost:' + port);
});
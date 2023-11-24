// backend using nodejs
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
var http = require('http');
const bodyParser = require('body-parser');

const port = 8080
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'appthuphi',
});

connection.connect((err) => {
  if (err) {
    console.log('Error connecting to database:', err);
  } else {
    console.log('Connection to database established successfully!');
  }
});

app.post('/login', function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  connection.query(
    'SELECT * FROM user WHERE username = ? AND password = ?',
    [username, password],
    (err, results, fields) => {
      console.log(results);
      if (err) {
        res.send({
          token: 'fail'
        });
      } else {
        if((results.length > 0)){
          res.send({
            token: 'success',
            uid: results[0].uid
          });
        }
      }
    }
  );
});

app.get("/test", function(req, res){
  {
    res.send('Hello World!');
  }
});

app.listen(port)
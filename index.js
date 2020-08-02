const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
const mysql = require('mysql');
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'us-cdbr-east-02.cleardb.com',
  user: 'b4d90c8a948ffc',
  password: '2dc553d4',
  database: 'heroku_255650b15c9441b'
});

mysql://b4d90c8a948ffc:2dc553d4@us-cdbr-east-02.cleardb.com/heroku_255650b15c9441b?reconnect=true

app.use(express.static(path.join(__dirname, 'client/build')));

app.listen(port, () => console.log(`Listening on port ${port}...`));

// const createUnixSocketPool = async (config) => {
//   const dbSocketPath = process.env.DB_SOCKET_PATH || '/cloudsql'

//   return await mysql.createPool({
//     user: 'masterpup',
//     password: 'puppyAPI123$',
//     database: 'puppy_api_db',
//     socketPath: 'puppy-api-db:us-central1:puppy-api'
//   })
// }

// createUnixSocketPool();

pool.getConnection(err => {
  if (err) throw err;
  console.log('Connected!');
});

app.use(express.json());

app.get('/ping', (req, res) => res.json('pong!'));

app.get('/pups', (req, res) => {
  pool.query('SELECT * FROM pups', (err, rows) => {
    if (err) throw err;
    res.set({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : "*", 
      'Access-Control-Allow-Credentials' : true
    })
    res.json(rows);
  })
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
})

app.post('/pups', (req, res) => {
  const newPup = { 
    name: req.body.name,
    img_url: req.body.img_url
   }
  pool.query('INSERT INTO pups SET ?', newPup, (err, res) => {
    if (err) throw err;
  })
})
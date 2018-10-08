const express = require('express');
const path = require('path');
const { Client } = require('pg');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const moment = require('moment');
const PORT = process.env.PORT || 5000;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const client = new Client({
  database: '',
  user: '',
  password: '',
  host: '',
  port: 5432,
  ssl: true
});

client.connect()
  .then(function () {
    console.log('connected to database!');
  })
  .catch(function () {
    console.log('Error');
  });

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(3000, function () {
  console.log('Server started at port 3000');
});

app.listen(PORT);

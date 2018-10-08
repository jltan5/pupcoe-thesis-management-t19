const express = require('express');
const path = require('path');
const { Client } = require('pg');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const moment = require('moment');
const PORT = process.env.PORT || 5000;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const client = new Client({
  database: 'dbou0tbvgvmigk',
  user: 'mzpwcgfmduxtdm',
  password: 'bc062e477ec12aea4d17e9007bbc1f12d40497ada068f7e16b0efeb61dfec5d6',
  host: 'ec2-54-221-225-11.compute-1.amazonaws.com',
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


app.get('/', function (req, res) {
  res.render('login');
});






app.listen(3000, function () {
  console.log('Server started at port 3000');
});

app.listen(PORT);

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

app.get('/Faculty/Admin/Home', function (req, res) {
  res.render('adminhome');
});

app.get('/Faculty/Regular/Home', function (req, res) {
  res.render('facultyhome');
});

app.get('/Student/Home', function (req, res) {
  res.render('facultyhome');
});

app.get('/LoginFailed', function (req, res) {
  res.render('LoginFailed');
});

app.get('/register', function (req, res) {
  res.render('register');
});

app.get('/registerfaculty', function (req, res) {
  res.render('registerfaculty');
});

app.get('/registersuccess', function (req, res) {
  res.render('registersuccess');
});

app.get('/regiinvalid', function (req, res) {
  res.render('regiinvalid');
});

app.get('/registerstudent', function (req, res) {
  res.render('registerstudent');
});

app.get('/adminclasses', function (req, res) {
  res.render('adminclass');
});

app.get('/facultyclasses', function (req, res) {
  res.render('facultyclass');
});

app.get('/studentclasses', function (req, res) {
});

app.post('/registudent', function (req, res) {
  var usertype = 'Student';
  var values = [];
  values = [req.body.firstname, req.body.lastname, req.body.username, req.body.password1, usertype, req.body.studentnumber];
  var pass1 = req.body.password1;
  var pass2 = req.body.password2;
  if (pass1 === pass2) {
     client.query('INSERT INTO users(first_name, last_name, username, password, usertype, studentnumber) VALUES($1, $2, $3, $4, $5, $6)', values, (err, res) => {
        if (err) {
          console.log(err.stack);
        } else {
          console.log(res.rows[0]);
        }
      });
        res.redirect('/registersuccess');
  } else {
    res.redirect('/regiinvalid');
  }
});

app.post('/regifaculty', function (req, res) {
  var usertype = 'Faculty';
  var values = [];
  values = [req.body.firstname, req.body.lastname, req.body.username, req.body.password1, usertype, req.body.Privelege];
  var pass1 = req.body.password1;
  var pass2 = req.body.password2;
  if (pass1 === pass2) {
     client.query('INSERT INTO users(first_name, last_name, username, password, usertype, isadmin) VALUES($1, $2, $3, $4, $5, $6)', values, (err, res) => {
        if (err) {
          console.log(err.stack);
        } else {
          console.log(res.rows[0]);
        }
      });
        res.redirect('/registersuccess');
  } else {
    res.redirect('/regiinvalid');
  }
});

app.post('/checkusertype', function (req, res) {
  var values = [];
  values = [req.body.username, req.body.password];
  var values1 = req.body.username;
  var values2 = req.body.password;
  var usertype = 'Faculty';
  var isadmin = 'Admin';
  console.log(req.body);
  client.query('SELECT username FROM users', (req, data) => {
    var list;
    var exist = 0;
    console.log('compareusername');
    for (var i = 0; i < data.rows.length; i++) {
      list = data.rows[i].username;
      console.log(list);
      if (list == values1) {
        exist = 1;
      }
    }
    if (exist === 1) {
      console.log('usernamevalid');
      client.query('SELECT password FROM users WHERE username = $1',[values1], (req, data) => {
        var list1;
        var exist1 = 0;
        console.log('comparepassword');
        for (var i = 0; i < data.rows.length; i++) {
        list1 = data.rows[i].password;
        console.log(list1);
        if (list1 == values2) {
        exist1 = 1;
      }
    }
    if (exist1 === 1) {
      console.log('LoginSucess');
      console.log('Checking Usertype');
      client.query('SELECT usertype, isadmin FROM users WHERE username = $1',[values1], (req, data) => {
        var usertypequery = data.rows[0].usertype;
        var isadminquery = data.rows[0].isadmin;
        if (usertypequery == usertype) {
          if (isadminquery == isadmin) {
            res.redirect('/Faculty/Admin/Home');
          } else{
            res.redirect('/Faculty/Regular/Home');
          }

        } else {
            res.redirect('Student/Home');
        }
      });
    } else {
      res.redirect('/LoginFailed');
    }
      });
    } else {
      res.redirect('/LoginFailed');
    }
  });
});

app.listen(3000, function () {
  console.log('Server started at port 3000');
});

app.listen(PORT);

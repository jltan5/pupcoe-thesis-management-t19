var express= require('express')
var router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs');
const db = require('../db/app')
const user = require('../models/users')

router.get('/', function(req, res, next) {
	if (req.isAuthenticated()){
    res.redirect('/login/account')
  } else {
    res.render('./login', {
      layout: 'main',
      error: req.flash('error')
    })
  }
})

router.post('/', passport.authenticate('local', {failureRedirect: '/login', failureFlash: 'Invalid credentials'}),
  function(req, res) {
    res.redirect('/login/account')
})


router.use('/account', function(req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.is_admin === true) {
      res.redirect('/admin')
    } else if (req.user.user_type === 'student') {
      res.redirect('/student')
    } else if (req.user.user_type === 'faculty') {
      res.redirect('/faculty')
    }
  } else {
    res.redirect('/login')
  }
})



module.exports = router
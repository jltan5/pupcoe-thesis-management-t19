var express= require('express')
var router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs');
const db = require('../db/app')
const user = require('../models/users')
const student = require('../models/student')



router.get('/', function(req, res, next) {
  res.render('./student/dashboard',{
    layout: 'student',
    first_name: req.user.first_name,
    middle_name: req.user.middle_name,
    last_name: req.user.last_name,
    suffix: req.user.suffix
  })
})

router.get('/profile', function(req, res, next) {
  student.getSectionData(req.user.id, function(sectionData) {
    console.log(sectionData)
    res.render('./student/profile',{
      layout: 'student',
      sectionData: sectionData,
      first_name: req.user.first_name,
      middle_name: req.user.middle_name,
      last_name: req.user.last_name,
      suffix: req.user.suffix
    })
  })
})

router.get('/group', function(req, res, next) {
  student.getMyGroupData(req.user.id, function(groupData) {
    student.getGroupMembers(groupData.group_id, function(groupMembers) {
      console.log(groupData)
      res.render('./student/group', {
        layout: 'student',
        title: 'My Group',
        css: '/assets/student_my_group.css',
        group: groupData,
        groupMembers: groupMembers
      })
    })
  })
})

module.exports = router
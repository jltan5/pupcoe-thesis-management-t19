var express= require('express')
var router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs');
const db = require('../db/app')
const user = require('../models/users')
const student = require('../models/student')
const faculty = require('../models/faculty')


router.get('/', function(req, res, next) {
  res.render('./faculty/dashboard',{
    layout: 'faculty',
    first_name: req.user.first_name,
    middle_name: req.user.middle_name,
    last_name: req.user.last_name,
    suffix: req.user.suffix
  })
})

router.get('/class', function(req, res, next) {
  faculty.getClassData(req.user.id, function(classData) {
    res.render('./faculty/class_list',{
      layout: 'faculty',
      first_name: req.user.first_name,
      middle_name: req.user.middle_name,
      last_name: req.user.last_name,
      suffix: req.user.suffix,
      classData: classData
    })
  })
})


router.post('/class', function(req, res, next) {
  faculty.getStudentsFromThisClass(req.body.classId, function(studentsData) {
    faculty.getClassInfo(req.body.classId, function(classData) {
      console.log(classData)
      res.render('./faculty/class_view', {
        layout: 'faculty',
        first_name: req.user.first_name,
        middle_name: req.user.middle_name,
        last_name: req.user.last_name,
        suffix: req.user.suffix,
        studentsData: studentsData,
        classData: classData[0]
      })
    })
    
  })
})

router.post('/class/groups', function(req, res, next) {
  if (req.body.manageGroups) {
    req.session.classIdForManagingGroup = req.body.classId
    res.redirect('/faculty/class/groups')
  } else if (req.body.createGroup) {
    if (!req.session.classIdForManagingGroup){
      res.redirect('/faculty/class')
    } else {
      console.log('creating a group')
      console.log(req.body)
      faculty.createGroup(req.session.classIdForManagingGroup, req.body.groupName, function(data) {
        res.redirect('/faculty/class/groups')
      })
    }
  } else if (req.body.addStudentToGroup) {
    console.log('adding member/s to a group')
    console.log(req.body)
    faculty.addMembersToGroup(req.body, function(data) {
      res.redirect('/faculty/class/groups')
    })
  } else if (req.body.removeFromGroup) {
    console.log(req.body)
    faculty.removeMemberFromGroup(req.body.groupClusterId, function(data) {
      res.redirect('/faculty/class/groups')
    })
  }
})

router.get('/class/groups', function(req, res, next) {
  if (!req.session.classIdForManagingGroup){
    res.redirect('/faculty/class')
  } else {
    faculty.getGroups(req.session.classIdForManagingGroup, function(groups) {
      faculty.getStudentsWithoutGroup(req.session.classIdForManagingGroup, function(studentsWithoutGroup) {
        faculty.getGroupData(req.session.classIdForManagingGroup, function(groupData) {
          res.render('./faculty/class_group', {
            layout: 'faculty',
            first_name: req.user.first_name,
            middle_name: req.user.middle_name,
            last_name: req.user.last_name,
            suffix: req.user.suffix,
            groups: groups,
            studentsWithoutGroup: studentsWithoutGroup,
            groupData: groupData
          })
        })
      })
    })
  }
})



module.exports = router
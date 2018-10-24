const db = require('../db/app.js')
const bcrypt = require('bcryptjs')
const user = require('./users.js')
const _ = require('lodash')
var actions = {
  getSectionData: (id, callback) => {
    const query = {
      text: `SELECT * FROM class_cluster WHERE student_id = ${id}`
    }
    db.query(query).then(sectionId => {
      const query2 = {
        text: `SELECT class.id, batch, section, prefix, first_name, middle_name, last_name, suffix FROM class INNER JOIN users ON users.id = class.advisor_id WHERE class.id = ${sectionId.rows[0].class_id}`
      }
      db.query(query2).then(data => {
        callback(data.rows[0])
      }).catch(e => {
        console.log(e)
        callback(e)
      })
    }).catch(e => {
      console.log(e)
      callback(e)
    })
  },
  getMyGroupData: (userId, callback) => {
    const query = {
      text: `SELECT group_id, group_number FROM group_cluster 
        INNER JOIN groups ON groups.id = group_cluster.group_id
        WHERE member_id = ${userId}`
    }
    db.query(query).then(data => {
      return callback(data.rows[0])
    }).catch(e => {
      console.log(e)
      return callback(e)
    })
  },
  getGroupMembers: (groupId, callback) => {
    const query = {
      text: `SELECT first_name, middle_name, last_name, suffix FROM group_cluster 
        INNER JOIN users ON users.id = group_cluster.member_id
        WHERE group_id = ${groupId}`
    }
    db.query(query).then(data => {
      return callback(data.rows)
    }).catch(e => {
      console.log(e)
      return callback(e)
    })
  }

}

module.exports = actions
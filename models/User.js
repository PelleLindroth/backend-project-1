const db = require('../db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const login = ({ email, password }) => {
  if (!email || !password) throw ('Invalid query. Required: email and password in body')

  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM USERS WHERE email = ?`, [email], function (err, row) {
      err && reject({ success: false, message: 'Nope' })
      console.log(row);
      const valid = bcrypt.compareSync(password, row.password)

      if (valid) {
        const payload = { email }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })

        resolve({ success: true, token })
      } else {
        reject({ success: false, message: 'Access denied' })
      }
    })
  })
}

const getUserInfo = email => {
  return new Promise((resolve, reject) => {
    db.get(`
    SELECT * FROM users WHERE email = ?`,
      [email],
      function (err, row) {
        err && reject({ success: false })

        !row && reject({ success: false })

        resolve({ email: row.email, id: row.user_id })
      })
  })
}

const updatePassword = (email, password) => {
  return new Promise((resolve, reject) => {
    db.run(`
    UPDATE users SET password = ? WHERE email = ? `,
      [password, email],
      function (err) {
        err && reject(err)

        resolve({ success: true, changes: this.changes })
      })
  })
}

module.exports = {
  login,
  getUserInfo,
  updatePassword
}
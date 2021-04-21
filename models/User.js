const db = require('../db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class User {
  static create(email, password) {
    return new User(email, password)
  }

  static async get(email) {
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

  static async update(email, newPassword) {
    const digest = bcrypt.hashSync(newPassword, 10)

    return new Promise((resolve, reject) => {
      db.run(`
    UPDATE users SET password = ? WHERE email = ? `,
        [digest, email],
        function (err) {
          err && reject(err)

          resolve({ success: true, changes: this.changes })
        })
    })
  }

  constructor(email, password) {
    this.email = email
    this.password = password
  }

  save() {
    const digest = bcrypt.hashSync(this.password, 10)

    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO USERS (email, password) VALUES (?,?)`, [this.email, digest], function (err) {
        err && reject(err)

        resolve({ success: true, message: `User saved with id ${this.lastID}` })
      })
    })
  }

  login() {
    return new Promise((resolve, reject) => {
      const password = this.password
      const email = this.email

      db.get(`SELECT * FROM USERS WHERE email = ?`, [email], function (err, row) {
        err && reject({ success: false, message: 'Nope' })

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
}

module.exports = User
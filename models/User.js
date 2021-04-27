const db = require('../db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { LoginError, MissingCredentialsError } = require('../errors')

class User {
  static create(email, password) {
    if (!email || !password) {
      throw (new MissingCredentialsError('email', 'password'))
    }
    return new User(email, password)
  }

  static async get(email) {
    return new Promise((resolve, reject) => {
      db.get(`
      SELECT * FROM users WHERE email = ?`,
        [email],
        function (err, row) {
          err && reject(err)

          !row && reject({ success: false })

          resolve({ email: row.email, id: row.user_id })
        })
    })
  }

  static async update(email, newPassword) {
    if (!newPassword) {
      throw (new MissingCredentialsError('newPassword'))
    }

    const digest = bcrypt.hashSync(newPassword, 10)

    return new Promise((resolve, reject) => {
      db.run(`
    UPDATE users SET password = ? WHERE email = ? `,
        [digest, email],
        function (err) {
          err && reject(err)
          !this.changes && resolve({ success: false, message: 'Could not update password' })
          resolve({ success: true, message: 'Password updated' })
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

  delete() {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM users WHERE email = ?`, [this.email], function (err) {
        err && reject({ success: false, error: err })
        !this.changes && reject({ success: false, message: 'Could not delete user' })

        resolve({ success: true, message: 'User safely deleted' })
      })
    })
  }

  login() {
    return new Promise((resolve, reject) => {
      const password = this.password
      const email = this.email

      db.get(`SELECT * FROM USERS WHERE email = ?`, [email], function (err, row) {
        if (err || !row) { reject(new LoginError()) }
        else {
          const valid = bcrypt.compareSync(password, row.password)
          if (valid) {
            const payload = { email }
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })

            resolve({ success: true, token })
          } else {
            reject(new LoginError())
          }
        }
      })
    })
  }
}

module.exports = User
const jwt = require('jsonwebtoken')
const { AuthError } = require('../errors')

const Authorize = (req, res, next) => {
  try {
    const token = req.headers.authorization.replace('Bearer ', '')
    const data = jwt.verify(token, process.env.JWT_SECRET)
    req.userEmail = data.email
    next()
  } catch (err) {
    next(new AuthError())
  }
}

module.exports = Authorize
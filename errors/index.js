const mainErrorHandler = (err, req, res, next) => {
  if (err.errorCode) {
    res.status(err.errorCode).json({ success: false, error: err.errorMessage })
  } else {
    res.status(500).json({ success: false, err })
  }
}

class AuthError extends Error {
  constructor() {
    super()
    this.errorCode = 401
    this.errorMessage = 'Access denied'
  }
}

class MissingCredentialsError extends Error {
  constructor(...params) {
    super()
    this.errorCode = 400
    this.errorMessage = `Invalid request. Required: ${params.join(', ')}`
  }
}

class LoginError extends Error {
  constructor() {
    super()
    this.errorCode = 401
    this.errorMessage = 'Login failed. Please check your email and password and try again.'
  }
}

class TooManyRequestsError extends Error {
  constructor(timeString) {
    super()

    this.errorCode = 429
    this.errorMessage = `Too many requests. Try again tomorrow at ${timeString}`
  }
}

class ParsingError extends Error {
  constructor(timeString) {
    super()
    this.errorCode = 400
    this.errorMessage = `Could not parse base64. Please check your link.`
  }
}

module.exports = {
  mainErrorHandler,
  AuthError,
  MissingCredentialsError,
  LoginError,
  TooManyRequestsError,
  ParsingError
}

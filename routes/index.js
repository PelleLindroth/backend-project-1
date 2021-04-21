const express = require('express')
const Routes = express.Router()
const Controller = require('../controllers')
const Authorize = require('../middleware/Authorize')
const Throttle = require('../middleware/Throttle')

// Log in
Routes.post('/login', Controller.login)

// Get user info
Routes.get('/me', Authorize, Controller.getUserInfo)

// Change password
Routes.patch('/me', Authorize, Controller.updatePassword)

// Generate profile
Routes.get('/generate', Authorize, Throttle, Controller.generateProfile)

module.exports = Routes
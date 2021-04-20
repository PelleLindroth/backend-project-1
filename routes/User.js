const express = require('express')
const UserRoutes = express.Router()
const User = require('../controllers/User')
const Authorize = require('../middleware/Authorize')

// Log in
UserRoutes.post('/login', User.login)

// Get user info
UserRoutes.get('/me', Authorize, User.getUserInfo)

// Change password
UserRoutes.patch('/me', Authorize, User.updatePassword)

// GET
// /generate
// Genererar en ny användarprofil, max 10st /dag per användare

module.exports = UserRoutes
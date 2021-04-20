const User = require('../models/User')

const login = async (req, res, next) => {
  try { res.json(await User.login(req.body)) }
  catch (err) { next(err) }
}

const getUserInfo = async (req, res, next) => {
  try { res.json(await User.getUserInfo(req.userEmail)) }
  catch (err) { next(err) }
}

const updatePassword = async (req, res, next) => {
  try { res.json(await User.updatePassword(req.userEmail, req.body.newPassword)) }
  catch (err) { next(err) }
}

module.exports = {
  login,
  getUserInfo,
  updatePassword
}
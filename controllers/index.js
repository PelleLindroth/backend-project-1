const User = require('../models/User')
const Profiler = require('../models/Profiler')

const login = async (req, res, next) => {
  const user = User.create(req.body.email, req.body.password)
  try { res.json(await user.login()) }
  catch (err) { next(err) }
}

const getUserInfo = async (req, res, next) => {
  try { res.json(await User.get(req.userEmail)) }
  catch (err) { next(err) }
}

const updatePassword = async (req, res, next) => {
  try { res.json(await User.update(req.userEmail, req.body.newPassword)) }
  catch (err) { next(err) }
}

const generateProfile = (req, res, next) => {
  try { res.json(Profiler.generateProfile(req.requestsLeft)) }
  catch (err) { next(err) }
}

const convertBase64 = (req, res, next) => {
  try { res.json(Profiler.convertBase64(req.params.base64data)) }
  catch (err) { next(err) }
}

module.exports = {
  login,
  getUserInfo,
  updatePassword,
  generateProfile,
  convertBase64
}
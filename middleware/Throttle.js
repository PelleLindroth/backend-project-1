const throttle = {}
const { TooManyRequestsError } = require('../errors')
const timeframe = 86400000

const Throttle = (req, res, next) => {
  if (!throttle[req.userEmail]) {
    throttle[req.userEmail] = {
      requestsLeft: 9,
      timestamp: Date.now()
    }
  } else {
    if (Date.now() - throttle[req.userEmail].timestamp < timeframe) {
      if (throttle[req.userEmail].requestsLeft) {
        throttle[req.userEmail].requestsLeft--
      } else {
        next(new TooManyRequestsError(new Date(throttle[req.userEmail].timestamp + timeframe).toLocaleTimeString('se')))
      }
    } else {
      throttle[req.userEmail] = {
        requestsLeft: 9,
        timestamp: Date.now()
      }
    }
  }

  res.set('RateLimit-Limit', 10)
  res.set('RateLimit-Remaining', throttle[req.userEmail].requestsLeft)
  res.set('RateLimit-Reset', new Date(throttle[req.userEmail].timestamp + timeframe))

  next()
}

module.exports = Throttle
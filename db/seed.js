const bcrypt = require('bcryptjs')
const User = require('../models/User')

const user1 = User.create('stabbing.steve@fuskeluring.hack', bcrypt.hashSync('grillkorv123', 10))
const user2 = User.create('murdering.mike@fuskeluring.hack', bcrypt.hashSync('bananpaj1337', 10))
const user3 = User.create('crimes.johnsson@fuskeluring.hack', bcrypt.hashSync('sötsursås42', 10))

user1.save()
user2.save()
user3.save()
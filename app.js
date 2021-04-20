const express = require('express')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT
const UserRoutes = require('./routes/User')

app.use(express.json())
app.use(UserRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
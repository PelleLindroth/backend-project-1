const express = require('express')
require('dotenv').config()
const app = express()
const Routes = require('./routes')
const { mainErrorHandler } = require('./errors')
const PORT = process.env.PORT

app.use(express.json())
app.use(Routes)
app.use(mainErrorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const { readdirSync } = require('fs')

dotenv.config()
app.use(cors())

//routes
readdirSync('./routes').map((r) => app.use('/', require('./routes/' + r)))

//database connection

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('DATABASE CONNECTED SUCCESSFULLY!!!!!')
  })
  .catch((err) => {
    console.log(err)
  })
const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}!!!!!!!`)
})

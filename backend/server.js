const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const dotenv = require('dotenv')
const { readdirSync } = require('fs')

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())
app.use(
  fileUpload({
    useTempFiles: true,
  })
)

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

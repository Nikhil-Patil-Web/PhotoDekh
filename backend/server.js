const express = require('express')
const cors = require('cors')
const app = express()

let allowed = ['http://localhost:3000', 'http://localhost:7000']
function options(req, res) {
  let tmp
  let origin = req.header('Origin')
  if (allowed.indexOf(origin) > -1) {
    tmp = {
      origin: true,
      optionSuccessStatus: 200,
    }
  } else {
    tmp = {
      origin: 'stupid',
    }
  }
  res(null, tmp)
}
app.use(cors(options))

app.get('/' || '/home', (req, res) => {
  res.send('Welcome to Home')
})

app.get('/books', (req, res) => {
  res.send('hahahahahaha')
})

app.listen('8000', () => {
  console.log('Server is listening!!!!!!!')
})

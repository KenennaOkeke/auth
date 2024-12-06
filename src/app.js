require('dotenv').config()
const config = require('./config')
const express = require('express')
const app = express()
const { Sequelize } = require('sequelize');
const bodyParser = require('body-parser')
const cors = require('cors')


app.use(cors({
  //origin: 'http://localhost:3000'
}))


app.use(bodyParser.json())

require('./routes')(app)

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).send("Internal Server Error")
  return next()
})

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`)
})

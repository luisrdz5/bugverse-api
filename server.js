'use strict'

const http = require('http')
const express = require('express')
const chalk = require('chalk')
const api = require('./api')

const app = express()
const port = process.env.PORT || 3000
const server = http.createServer(app)

app.use('/api', api)

server.listen(port, () => {
  console.log(`${chalk.green('[bugverse-api]')} server listening on port ${port}`)
})

'use strict'

const debug = require('debug')
const http = require('http')
const express = require('express')
const chalk = require('chalk')
const api = require('./api')

const app = express()
const port = process.env.PORT || 3000
const server = http.createServer(app)

app.use('/api', api)

//Express Error handler

app.use((err, req, res, next) => {
    debug(`Error: ${err.message}`)

    if(err.message.match(/not found/)){
        return res.status(404).send({error: err.message})
    }
    res.status(500).send({ error: err.message})
})

function handleFatalError (err) {
    console.error(`${chalk.red('[Fatal Error]')} ${err.message}`)
    console.error(err.stack)
    process.exit(1)
}

process.on('uncaughtException', handleFatalError)
process.on('unhandleFatalError', handleFatalError)

server.listen(port, () => {
  console.log(`${chalk.green('[bugverse-api]')} server listening on port ${port}`)
})

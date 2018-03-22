'use strict'

const Sequelize = require('sequelize')
const debug = require('debug')('bugverse:api:db')

module.exports = {
  db: {
    database: process.env.DB_NAME || 'bugverse',
    username: process.env.DB_USER || 'bugv',
    password: process.env.DB_PASS || 'bug',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: s => debug(s),
    operatorsAliases: Sequelize.Op
  },
  auth: {
    secret: process.env.SECRET || 'bug'
  }
}

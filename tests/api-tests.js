'use strict'

const test = require('ava')
const request = require('supertest')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const agentFixtures = require('./fixtures/agent')
const metricFixtures = require('./fixtures/metric')

const auth = require('../auth')
const config = require('../config')
const util = require('util')
const sign = util.promisify(auth.sign)


let token = null
let sandbox = null
let server = null
let dbStub = null
let AgentStub = {}
let MetricStub = {}
let uuid = 'yxx'

test.beforeEach(async () => {
  sandbox = sinon.sandbox.create()

  dbStub = sandbox.stub()
  dbStub.returns(Promise.resolve({
    Agent: AgentStub,
    Metric: MetricStub
  }))

  AgentStub.findConnected = sandbox.stub()
  AgentStub.findConnected.returns(Promise.resolve(agentFixtures.connected))

  AgentStub.findByUuid = sandbox.stub()
  AgentStub.findByUuid.returns(Promise.resolve(agentFixtures.single))

  token = await sign({ admin: true, username: 'bug' }, config.auth.secret)

  const api = proxyquire('../api', {
    'bugverse-db': dbStub
  })
  server = proxyquire('../server', {
    './api': api
  })
})
test.afterEach(() => {
  sandbox && sinon.sandbox.restore()
})

test.serial.cb('/api/agents', t => {
  request(server)
    .get('/api/agents')
    .set('Authorization', ` Bearer ${token}`)
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      t.falsy(err, 'should not return an error')
      let body = JSON.stringify(res.body)
      let expected = JSON.stringify(agentFixtures.connected)
      t.deepEqual(body, expected, 'response body should be the expected')
      t.end()
    })
})
test.serial.cb('/api/agent/:uuid', t => {
  request(server)
    .get(`/api/agent/${uuid}`)
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      t.falsy(err, 'should not return an error')
      let body = JSON.stringify(res.body)
      let expected = JSON.stringify(agentFixtures.single)
      t.deepEqual(body, expected, 'response body should be the expected')
      t.end()
    })
})


test.serial.todo('/api/agent/:uuid - not found')

test.serial.todo('/api/metrics/:uuid')
test.serial.todo('/api/metrics/:uuid - not found')

test.serial.todo('/api/metrics/:uuid/:type')
test.serial.todo('/api/metrics/:uuid/:type - not found')

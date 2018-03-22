'use strict'

const agent = {
  id: 1,
  uuid: 'yxx',
  username: 'bug',
  name: 'test',
  hostname: 'bot',
  pid: 10,
  connected: true,
  createAt: new Date(),
  updatedAt: new Date()
}

const agents = [
  agent,
  extend(agent, {id: 2, uuid: 'yyy', connected: false, username: 'bug'}),
  extend(agent, {id: 3, uuid: 'xxx'}),
  extend(agent, {id: 4, uuid: 'yyy-yyyy-yyz', username: 'test'})
]
function extend (obj, values) {
  const clone = Object.assign({}, obj)
  return Object.assign(clone, values)
}

module.exports = {
  single: agent,
  all: agents,
  connected: agents.filter(a => a.connected),
  bug: agents.filter(a => a.username === 'bug'),
  byUuid: id => agents.filter(a => a.uuid === id).shift(),
  byId: id => agents.filter(a => a.id === id).shift()

}

'user strict'

const metric = {
  id: 1,
  agentid: 'aaa-aaa-aaa',
  type: 'temperature',
  value: '20',
  createAt: new Date(),
  updatedAt: new Date()
}

const metrics = [
  metric,
  extend(metric, {id: 2, agentid: 'aaa-aaa-aab', type: 'temperature', value: '10'}),
  extend(metric, {id: 3, agentid: 'aaa-aaa-aba', type: 'temperature', value: '15'}),
  extend(metric, {id: 4, agentid: 'aaa-aaa-baa', type: 'temperature', value: '18'})
]

function extend (obj, values) {
  const clone = Object.assign({}, obj)
  return Object.assign(clone, values)
}

module.exports = {
  single: metric,
  all: metrics,
  // connected: metrics.filter(a => a.connected),
  byAgentId: agentid => metrics.filter(a => a.agentid === agentid).shift(),
  byId: id => metrics.filter(a => a.id === id).shift()
}

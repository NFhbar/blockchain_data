/* eslint-disable */
const device = require('device-ip-location')

module.exports = (req, res, next) => {
  const agent = req.headers['user-agent']
  const requestIp = req.ip
  device.getInfo(agent, requestIp, function (err, res) {
    req.origin = res
    next()
  })
}

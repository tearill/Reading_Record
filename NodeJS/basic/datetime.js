function getCurrentTime() {
  const time = new Date()
  return time.toLocaleString()
}

module.exports = getCurrentTime
// exports.getCurrentTime = getCurrentTime
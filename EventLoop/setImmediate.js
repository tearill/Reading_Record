const fs = require('fs')

fs.readFile(__dirname, () => {
  setTimeout(() => {
    console.log('setTimeout')
  }, 0)
  
  setImmediate(() => {
    console.log('setImmediate')
  })
})
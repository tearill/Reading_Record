let http = require('http')
let helloworld = ''
for (let i = 0; i < 1024 * 10; i++) {
  helloworld += 'a'
}

http.createServer(function(req, res) {
  res.writeHead(200)
  res.end(helloworld)
}).listen(8001)

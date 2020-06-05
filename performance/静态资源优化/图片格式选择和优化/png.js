var pngquant = require('node-pngquant-native');
// const pngquant = require('jdf-png-native');
var fs = require('fs');

fs.readFile('./in.png', function (err, buffer) {
  if (err) throw err;
  var resBuffer = pngquant.compress(buffer, {
    "speed": 1 // 1 - 11
  });

  fs.writeFile('./out.png', resBuffer, {
    flags: 'wb'
  }, function (err) {});
})

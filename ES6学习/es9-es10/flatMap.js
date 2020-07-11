// flatMap == flat + map
let strings = [
  'I am xx', 'I born at xx'
]
// ['I', 'am', 'xx', 'I', 'born', 'at', 'xx']
console.log(strings.map(x => x.split(' ')).flat(1));
console.log(strings.flatMap(x => x.split(' ')));
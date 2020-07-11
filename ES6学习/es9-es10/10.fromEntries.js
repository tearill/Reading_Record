// es10 Object.fromEntries(iterable)
// node v12+
let obj1 = Object.fromEntries([
  ['a', 1],
  ['b', 2]
])
console.log(obj1);

let map = new Map([
  ['a', 1],
  ['b', 2]
])
console.log(Object.fromEntries(map.entries()));

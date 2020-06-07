var bar = {
  myName: 'Horace',
  printName: function() {
    console.log(myName);
  }
}

for (key in bar) {
  console.log(key);
}

var myName = 'outerName';

bar.printName();

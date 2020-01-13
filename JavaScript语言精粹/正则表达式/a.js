var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
var url = "http://www.ora.com:80/goodparts?q#fragment";

// console.log(parse_url.test(url));
var result = parse_url.exec(url);
var names = ['url', 'schema', 'slash', 'host', 'port', 'path', 'query', 'hash'];
var blanks = "   ";
var i;
for(i = 0; i < names.length; i += 1) {
    console.log(names[i] + ':' + blanks.substring(names[i].length), result[i]);
}

var parse_number = /^-?\d+(?:\.\d*)?(?:e[+\-]?\d+)?$/i;
var test = function(num) {
    console.log(parse_number.test(num));
}
test('1');
test('number');
test('98.6');
test('132.21.86.100');
test('123.45E-67');
test('123.45D-67');

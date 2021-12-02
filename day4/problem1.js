const md5 = require('md5');

const data = 'yzbqklnj';
let hash = '';
let number = 0;
while (!hash.startsWith('00000')) {
  hash = md5(`${data}${++number}`);
}

console.log(number);

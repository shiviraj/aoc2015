const fs = require('fs');

const data = fs.readFileSync('./input.txt', 'utf8');

const chars = data.split('');
let count = 0;

for (let index = 0; index < chars.length; index++) {
  if (chars[index] === '(') count++;
  if (chars[index] === ')') count--;
}

console.log(count);

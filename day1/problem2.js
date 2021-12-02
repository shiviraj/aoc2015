const fs = require('fs');

const data = fs.readFileSync('./input.txt', 'utf8');

const chars = data.split('');
let count = 0;
let index = 0;

while (count !== -1) {
  if (chars[index] === '(') count++;
  if (chars[index] === ')') count--;
  index++;
}

console.log(index);

const fs = require('fs');

const isNiceString = (string) => {
  const chars = string.split('');
  let vowels = 0;
  let lastChar = '';
  let isDoubleChar = false;
  let isDisallowedChar = false;
  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    if ('aeiou'.includes(char)) vowels++;
    if (lastChar === char) isDoubleChar = true;
    if (['ab', 'cd', 'pq', 'xy'].includes(lastChar + char))
      isDisallowedChar = true;
    lastChar = char;
  }
  return vowels >= 3 && isDoubleChar && !isDisallowedChar;
};

const strings = fs.readFileSync('./input.txt', 'utf8').split('\n');
const niceStrings = strings.map(isNiceString).filter((i) => i);
console.log(niceStrings.length);

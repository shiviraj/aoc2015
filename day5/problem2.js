const fs = require('fs');

const isNiceString = (string) => {
  const chars = string.split('');
  let secondLastChar = '';
  let lastChar = '';
  let isDoubleChar = false;
  let repeatedChars = false;
  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    if (secondLastChar === char) repeatedChars = true;
    if (i > 1 && string.slice(0, i - 1).includes(lastChar + char))
      isDoubleChar = true;
    secondLastChar = lastChar;
    lastChar = char;
  }
  return isDoubleChar && repeatedChars;
};

// console.log(isNiceString('ieodomkazucvgmuy'));

const strings = fs.readFileSync('./input.txt', 'utf8').split('\n');
const niceStrings = strings.filter(isNiceString);
console.log(niceStrings.length);

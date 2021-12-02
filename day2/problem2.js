const fs = require('fs');

const calculateRibbonLength = (length, width, height) => {
  const greatestSide = Math.max(length, width, height);
  return 2 * (length + width + height - greatestSide) + length * width * height;
};

const getRibbonLength = (sides) => {
  const [length, width, height] = sides.split('x').map((it) => +it);
  return calculateRibbonLength(length, width, height);
};

const data = fs.readFileSync('./input.txt', 'utf8');
const sides = data.split('\n');
const length = sides.reduce((totalLength, side) => {
  return totalLength + getRibbonLength(side);
}, 0);

console.log(length);

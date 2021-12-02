const fs = require('fs');

const calculateArea = (length, width, height) => {
  const area1 = length * width;
  const area2 = length * height;
  const area3 = height * width;
  const smallestArea = Math.min(area1, area2, area3);
  return 2 * (area1 + area2 + area3) + smallestArea;
};

const getArea = (sides) => {
  const [length, width, height] = sides.split('x');
  return calculateArea(length, width, height);
};

const data = fs.readFileSync('./input.txt', 'utf8');
const sides = data.split('\n');
const area = sides.reduce((totalArea, side) => {
  return totalArea + getArea(side);
}, 0);

console.log(area);

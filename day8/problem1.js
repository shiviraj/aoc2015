const fs = require('fs')

const data = fs.readFileSync('./input.txt', 'utf-8')
  .split('\n')
  .slice(0,-1)
  
const originalLengths = data.map(it=>it.length)
const realLength = data.map(it=>eval(String(it)).length)

const findSum = (array)=> array.reduce((total, num) => total + num, 0)

console.log(findSum(originalLengths)-findSum(realLength))

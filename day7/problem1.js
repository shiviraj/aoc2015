const fs = require('fs');

const operators = ['AND', 'OR', 'LSHIFT', 'RSHIFT', 'NOT'];

const getSignal = (signals) => {
  let signal1, signal2, operator;
  for (let i = 0; i < signals.length; i++) {
    if (operators.includes(signals[i])) operator = signals[i];
    else signal1 ? (signal2 = signals[i]) : (signal1 = signals[i]);
  }
  return { signal1, signal2, operator };
};

const parseInputs = (data) => {
  return data.map((d) => {
    const [input, output] = d.split(' -> ');
    const inputs = input.split(' ').map((it) => (Number.isNaN(+it) ? it : +it));
    return { input: getSignal(inputs), output };
  });
};

const getAnswer = function (input, value1, value2) {
  switch (input.operator) {
    case 'AND':
      return value1 & value2;
    case 'OR':
      return value1 | value2;
    case 'LSHIFT':
      return value1 << value2;
    case 'RSHIFT':
      return value1 >> value2;
    case 'NOT':
      return value1 ^ 65535;
    default:
      return value1;
  }
};

const solve = (input, wires, key) => {
  if (input === undefined) return;
  if (typeof input === 'number') return input;
  if (typeof wires[input] === 'number') return wires[input];
  if (
    input.operator === undefined &&
    input.signal2 === undefined &&
    typeof input.signal1 === 'number'
  )
    return input.signal1;

  const value1 =
    typeof input.signal1 === 'number'
      ? input.signal1
      : solve(wires[input.signal1], wires, input.signal1);
  const value2 =
    typeof input.signal2 === 'number'
      ? input.signal2
      : solve(wires[input.signal2], wires, input.signal2);
  wires[key] = getAnswer(input, value1, value2);
  return wires[key];
};

const startCircuit = (wires, inputs) => {
  inputs.forEach(({ input, output }) => (wires[output] = input));
  return wires;
};

const data = fs.readFileSync('./input.txt', 'utf8').split('\n');

const inputs = parseInputs(data);

const wires = {};
startCircuit(wires, inputs);
console.log(wires);
const answer = solve(wires.a, wires, 'a');

console.log(answer);

// console.log(wires);

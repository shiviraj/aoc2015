const fs = require('fs');

const parse = (number) => {
  return number.split(',').map((it) => +it);
};

const parseStatement = (statement) => {
  const [actionAndFrom, till] = statement.split(' through ');
  const actionsAndFrom = actionAndFrom.split(' ');
  const actions = actionsAndFrom.slice(0, -1);
  const from = actionsAndFrom.slice(-1);
  return {
    action: actions.join(' '),
    from: parse(from[0]),
    to: parse(till),
  };
};

const operate = (light, action) => {
  if (action === 'turn on') {
    return 1;
  }
  if (action === 'turn off') {
    return 0;
  }
  if (action === 'toggle') {
    return light === 1 ? 0 : 1;
  }
  return light;
};

const operateLights = (lights, { action, from, to }) => {
  return lights.map((row, rowNo) => {
    return row.map((light, colNo) => {
      if (
        from[0] <= rowNo &&
        rowNo <= to[0] &&
        from[1] <= colNo &&
        colNo <= to[1]
      ) {
        return operate(light, action);
      }
      return light;
    });
  });
};

const countOnLights = (lights) => {
  let onLights = 0;
  for (let i = 0; i < lights.length; i++) {
    for (let j = 0; j < lights[i].length; j++) {
      if (lights[i][j]) onLights++;
    }
  }
  return onLights;
};

const lights = new Array(1000).fill(new Array(1000).fill(0));

const statements = fs.readFileSync('./input.txt', 'utf-8').split('\n');

// const statement = 'turn off 499,499 through 500,500';
const instructions = statements.map(parseStatement);
// console.log(instructions);

const operatedLights = instructions.reduce((allLights, instruction) => {
  return operateLights(allLights, instruction);
}, lights);

const count = countOnLights(operatedLights);
console.log(count);

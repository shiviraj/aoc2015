const fs = require('fs');

const findNextLocation = (currentLocation, direction) => {
  const location = currentLocation.slice();
  if (direction === '>') location[0]++;
  if (direction === '<') location[0]--;
  if (direction === '^') location[1]++;
  if (direction === 'v') location[1]--;
  return location;
};

const data = fs.readFileSync('./input.txt', 'utf8').split('');
// const data = '^>v<';
const instructions = [];
for (let i = 0; i < data.length; i++) {
  if (i % 2 == 0) instructions.push(data[i]);
  else instructions[(i - 1) / 2] = instructions[(i - 1) / 2] + data[i];
}

const locations = [[0, 0]];
const roboLocations = [[0, 0]];

for (let index = 0; index < instructions.length; index++) {
  locations.push(findNextLocation(locations[index], instructions[index][0]));
  roboLocations.push(
    findNextLocation(roboLocations[index], instructions[index][1])
  );
}

const uniueLocations = [...locations, ...roboLocations].reduce(
  (allLocations, location) => {
    if (!allLocations.some((l) => l[0] === location[0] && l[1] === location[1]))
      allLocations.push(location);
    return allLocations;
  },
  []
);

console.log(uniueLocations.length);

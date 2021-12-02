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
const locations = [[0, 0]];

for (let index = 0; index < data.length; index++) {
  locations.push(findNextLocation(locations[index], data[index]));
}

const uniueLocations = locations.reduce((allLocations, location) => {
  if (!allLocations.some((l) => l[0] === location[0] && l[1] === location[1]))
    allLocations.push(location);
  return allLocations;
}, []);

console.log(uniueLocations.length);

const fs = require('fs')

const parseDistances = data => {
  return data.map(d => {
    const [locations, distance] = d.split(' = ')
    const [location1, location2] = locations.split(' to ')
    return {locations: [location1, location2], distance: +distance}
  })
}

const findAllLocations = (distances) => {
  return distances.reduce((locations, location) => {
    if (!locations.includes(location.locations[0])) locations.push(location.locations[0])
    if (!locations.includes(location.locations[1])) locations.push(location.locations[1])
    return locations
  }, []);
};

const isVisitedBothCities = (visitedCities, locations) => {
  return visitedCities.includes(locations[0]) && visitedCities.includes(locations[1]);
};

const findForestCity = (distances, location, visitedCities) => {
  return distances.filter(({locations}) => locations.includes(location) && !isVisitedBothCities(visitedCities, locations))
    .reduce((forestCity, location) => (forestCity.distance < location.distance) ? location : forestCity)
}

const findDistances = (allLocations, distances) => {
  const allDistances = []
  allLocations.forEach(location => {
    const visitedCities = [location]
    let totalDistance = 0
    while (allLocations.length !== visitedCities.length) {
      const {locations, distance} = findForestCity(distances, location, visitedCities)
      location = locations[0] === location ? locations[1] : locations[0]
      totalDistance += distance
      visitedCities.push(location)
    }
    allDistances.push({locations: visitedCities, totalDistance})
  })
  return allDistances
};


const data = fs.readFileSync('./day9/input.txt', 'utf-8')
  .split('\n')
  .slice(0, -1)

const distances = parseDistances(data)
const allLocations = findAllLocations(distances);
const totalDistances = findDistances(allLocations, distances)
  .map(it => it.totalDistance)

console.log(Math.max(...totalDistances))

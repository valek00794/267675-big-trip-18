import { CITY_DESC, CITIES } from './consts.js';
import { getRandomInteger,getRandomElementsFromArray } from '../utils.js';

const generateDestination = (id) => ({
  id,
  description: getRandomElementsFromArray(CITY_DESC),
  name: CITIES[getRandomInteger(0, CITIES.length - 1)],
  pictures: [
    {
      src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 100)}`,
      description: CITY_DESC[getRandomInteger(0, CITY_DESC.length - 1)].slice(getRandomInteger(0,CITY_DESC.length - 1)),
    }
  ]
});

const destinations = [];
for (let i = 1; i < CITIES.length; i++) {
  destinations.push(generateDestination(i));
}

export { destinations };

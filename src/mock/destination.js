import { CITY_DESC, CITIES } from './consts.js';
import { getRandomInteger, getRandomElementsFromArray } from '../utils/common.js';

const generateDestination = (id) => ({
  id,
  description: getRandomElementsFromArray(CITY_DESC),
  name: CITIES[id],
  pictures: [
    {
      src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 100)}`,
      description: `${CITIES[id]} ${CITY_DESC[getRandomInteger(0, CITY_DESC.length - 1)].split().slice(0,1)}`,
    }
  ]
});

const getDestinations = (count) => {
  const dests = [];
  for (let i = 0; i < count; i++) {
    dests.push(generateDestination(i));
  }
  return dests;
};

const destinations = getDestinations(CITIES.length);

export { destinations };

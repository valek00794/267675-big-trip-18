import dayjs from 'dayjs';
// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
//Функция получения случайного массива из исходного массива
//Источник проект Кексобукинг https://github.com/valek00794/267675-keksobooking-26
function getRandomElementsFromArray(arr) {
  const maxLength = arr.length;
  const lengthOfArray = getRandomInteger(1, maxLength);
  const elements = [];
  for (let i = elements.length; i < lengthOfArray; i++) {
    const indexOfElement = getRandomInteger(0, maxLength - 1);
    const element = arr[indexOfElement];
    if (!elements.includes(element)) {
      elements.push(element);
    }
  }
  return elements;
}
//Функция напсиания строки с заглавной буквы
//Источник https://learn.javascript.ru/task/ucfirst
function ucFirst(str) {
  if (!str) {
    return str;
  }
  return str[0].toUpperCase() + str.slice(1);
}

const humanizeDateDDMMYYHHmm = (date) => dayjs(date).format('DD/MM/YY HH:mm');
const humanizeDateHHmm = (date) => dayjs(date).format('HH:mm');
const humanizeDateMMMDD = (date) => dayjs(date).format('MMM DD');

const getTimeFromMins = (mins) => {
  const hours = Math.trunc(mins / 60);
  const minutes = mins % 60;
  return `${hours}H ${minutes}M`;
};

export {
  getRandomInteger,
  humanizeDateHHmm,
  humanizeDateMMMDD,
  humanizeDateDDMMYYHHmm,
  getRandomElementsFromArray,
  ucFirst,
  getTimeFromMins
};

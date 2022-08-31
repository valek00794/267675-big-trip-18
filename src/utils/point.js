import dayjs from 'dayjs';

const humanizeDateDDMMYYHHmm = (date) => dayjs(date).format('DD/MM/YY HH:mm');
const humanizeDateHHmm = (date) => dayjs(date).format('HH:mm');
const humanizeDateMMMDD = (date) => dayjs(date).format('MMM DD');

const getTimeFromMins = (mins) => {
  const hours = Math.trunc(mins / 60);
  const minutes = mins % 60;
  return `${hours}H ${minutes}M`;
};

//Функция напсиания строки с заглавной буквы
//Источник https://learn.javascript.ru/task/ucfirst
const setCapitalLetter = (str) => {
  if (!str) {
    return str;
  }
  return str[0].toUpperCase() + str.slice(1);
};

const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

const sortPointUp = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);

  return weight ?? dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
};

const sortPointTime = (pointA, pointB) => (pointA.dateTo - pointA.dateFrom) - (pointB.dateTo - pointB.dateFrom);

const sortPointPrice = (pointA, pointB) => pointA.basePrice - pointB.basePrice;

export {
  humanizeDateHHmm,
  humanizeDateMMMDD,
  humanizeDateDDMMYYHHmm,
  getTimeFromMins,
  setCapitalLetter,
  sortPointUp,
  sortPointPrice,
  sortPointTime,
};

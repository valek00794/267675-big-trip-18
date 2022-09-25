import dayjs from 'dayjs';

const FilterType = {
  ALL: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const maxShowTitleCities = 3;

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const SortType = {
  DEFAULT: 'day',
  TIME: 'time',
  PTICE: 'price',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const BlankPoint = {
  destination: 0,
  dateFrom: dayjs(),
  dateTo: dayjs(),
  type: 'taxi',
  basePrice: '',
  offers: [],
};

export {
  FilterType,
  maxShowTitleCities,
  Mode,
  SortType,
  UserAction,
  UpdateType,
  BlankPoint,
};

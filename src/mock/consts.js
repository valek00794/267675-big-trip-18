import dayjs from 'dayjs';

const POINT_COUNT = 3;

const CITY_DESC = [
  'Нет более гармоничного города в Европе, чем этот. Эпохи, стили, расы мирно сосуществуют на крохотной территории, половина из которой - вода. В переводе с голландского Амстердам означает "Дамба на реке Амстел',
  'Издалека город похож на широкую пирамиду. На сотни метров раскинулась белая колоннада набережной, будто подпирая собой весь город',
  'Город находится на высоте от 1240 до 1470 метров. Здесь почти нет высотных зданий',
  'В заливе Порт-Джексон было заложено первое поселение - нынешний город. В 1980 году, после строительного бума, город стал одной из главных мировых столиц, международным финансовым центром. Это самый старый и самый красивый город на всем австралийском континенте',
  'Расположен в долине, у подножия древнего вулкана. Это один из древнейших индейских городов. Его название происходит от древних жителей страны - народа киту.',
  'Белокаменный город из известняка, поднявшийся из раскалённых песков подобно сказочному миражу из "Тысячи и одной ночи". Он не похож ни на один кенийский город: ажурные минареты, белые мечети со склонившимися над ними финиковыми пальмами, побеленные глинобитные арабские постройки без окон. Всё это скорее напоминает Саудовскую Аравию, чем Кению.',
];

const CITIES = [
  'Tokyo',
  'Seoul',
  'São Paulo',
  'Paris',
  'London',
  'Singapore',
  'Shanghai',
];

const TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant'
];

const EXTRA_OFFERS = [
  'Upgrade to a business class',
  'Add luggage',
  'Switch to comfort class',
  'Add meal',
  'Choose seats',
  'Travel by train',
];

const basePrice = {
  MIN: 100,
  MAX: 1000,
};

const offerPrice = {
  MIN: 10,
  MAX: 100,
};

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
};

const NewPoint = {
  dateFrom: dayjs(),
  dateTo: dayjs(),
  type: TYPES[0],
  basePrice: 0,
  offers: [],
};

export {
  POINT_COUNT,
  CITY_DESC,
  CITIES,
  TYPES,
  EXTRA_OFFERS,
  offerPrice,
  basePrice,
  FilterType,
  maxShowTitleCities,
  Mode,
  SortType,
  UserAction,
  UpdateType,
  NewPoint,
};

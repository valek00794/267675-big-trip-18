import MainPresenter from './presenter/main-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';

import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import PointsApiService from './point-api-service.js';

const AUTHORIZATION = 'Basic dmFsZW50aW5fMDA3OTRAYmsucnU6UEBzc3cwcmQzMg==';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip/';

const pageBodyElement = document.querySelector('.page-body__page-main');
const eventsElement = pageBodyElement.querySelector('.trip-events');
const siteFilterElement = document.querySelector('.trip-controls__filters');
const newEventBtn = document.querySelector('.trip-main__event-add-btn');


const pointsModel = new PointsModel(new PointsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();
const mainPresenter = new MainPresenter(eventsElement, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(siteFilterElement, filterModel, pointsModel);


const handleNewEventFormClose = () => {
  newEventBtn.disabled = false;
};

const handleNewEventButtonClick = () => {
  mainPresenter.createPoint(handleNewEventFormClose);
  newEventBtn.disabled = true;
};

newEventBtn.addEventListener('click', handleNewEventButtonClick);

mainPresenter.init();
filterPresenter.init();


import MainPresenter from './presenter/main-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';

import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';

const pageBodyElement = document.querySelector('.page-body__page-main');
const eventsElement = pageBodyElement.querySelector('.trip-events');
const siteFilterElement = document.querySelector('.trip-controls__filters');
const newEventBtn = document.querySelector('.trip-main__event-add-btn');


const pointsModel = new PointsModel();
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


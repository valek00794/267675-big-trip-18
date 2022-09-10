import MainPresenter from './presenter/main-presenter.js';
import PointsModel from './model/points-model.js';

const pageBodyElement = document.querySelector('.page-body__page-main');
const eventsElement = pageBodyElement.querySelector('.trip-events');

const pointsModel = new PointsModel();
const mainPresenter = new MainPresenter(eventsElement, pointsModel);

mainPresenter.init();


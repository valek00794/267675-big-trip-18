import { render, RenderPosition } from './render.js';
import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import MainPresenter from './presenter/main-presenter.js';
import TripInfoView from './view/trip-info-view.js';
import PointsModel from './model/points-model.js';


const siteMainTripElement = document.querySelector('.trip-main');
const siteFilterElement = siteMainTripElement.querySelector('.trip-controls__filters');

render(new TripInfoView(), siteMainTripElement, RenderPosition.AFTERBEGIN);

render(new FilterView(), siteFilterElement);

const pageBodyElement = document.querySelector('.page-body__page-main');
const eventsElement = pageBodyElement.querySelector('.trip-events');

render(new SortView(), eventsElement);

const pointsModel = new PointsModel();
const mainPresenter = new MainPresenter();
mainPresenter.init(eventsElement, pointsModel);

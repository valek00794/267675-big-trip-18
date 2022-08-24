import { render, RenderPosition } from './framework/render.js';
import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import MainPresenter from './presenter/main-presenter.js';
import TripInfoView from './view/trip-info-view.js';
import PointsModel from './model/points-model.js';
import {generateFilter} from './mock/filter.js';


const siteMainTripElement = document.querySelector('.trip-main');
const siteFilterElement = siteMainTripElement.querySelector('.trip-controls__filters');
const pageBodyElement = document.querySelector('.page-body__page-main');
const eventsElement = pageBodyElement.querySelector('.trip-events');

const pointsModel = new PointsModel();
const mainPresenter = new MainPresenter();

const filters = generateFilter(pointsModel.points);

render(new TripInfoView(), siteMainTripElement, RenderPosition.AFTERBEGIN);

render(new FilterView(filters), siteFilterElement);

render(new SortView(), eventsElement);

mainPresenter.init(eventsElement, pointsModel);


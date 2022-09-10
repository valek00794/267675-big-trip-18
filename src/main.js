import {render} from './framework/render.js';

import MainPresenter from './presenter/main-presenter.js';

import PointsModel from './model/points-model.js';

import FilterView from './view/filter-view.js';

import { generateFilter } from './mock/filter.js';

const pageBodyElement = document.querySelector('.page-body__page-main');
const eventsElement = pageBodyElement.querySelector('.trip-events');
const siteFilterElement = document.querySelector('.trip-controls__filters');

const pointsModel = new PointsModel();
const mainPresenter = new MainPresenter(eventsElement, pointsModel);

const filters = generateFilter(pointsModel.points);
render(new FilterView(filters), siteFilterElement);

mainPresenter.init();


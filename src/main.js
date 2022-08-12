import NewFilterFormView from './view/filter-view.js';
import NewSortFormView from './view/sort-view.js';
import {render} from './render.js';

const siteMainTripElement = document.querySelector('.trip-main');
const siteFilterElement = siteMainTripElement.querySelector('.trip-controls__filters');

render(new NewFilterFormView(), siteFilterElement);

const siteBodyElement = document.querySelector('.page-body__page-main');
const siteEventsElement = siteBodyElement.querySelector('.trip-events');

render(new NewSortFormView(), siteEventsElement);

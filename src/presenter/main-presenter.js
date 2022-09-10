import { render, RenderPosition, remove } from '../framework/render.js';

import NewPointView from '../view/new-point-view.js';
import ContentListView from '../view/content-list-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import SortView from '../view/sort-view.js';
import TripInfoView from '../view/trip-info-view.js';
import FilterView from '../view/filter-view.js';


import PointPresenter from './point-presenter.js';

import { sortPointUp, sortPointPrice, sortPointTime } from '../utils/point.js';

import { SortType, UpdateType, UserAction } from '../mock/consts.js';
import { generateTripInfo } from '../mock/trip-info.js';
import { generateFilter } from '../mock/filter.js';

export default class MainPresenter {
  #contentContainer = null;
  #pointsModel = null;

  #contentListComponent = new ContentListView();
  #newPointComponent = new NewPointView();
  #emptyComponent = new ListEmptyView();
  #sortComponent = null;
  #tripInfoComponent = null;
  #filterComponent = null;

  #pointsPresenter = new Map();
  #currentSortType = SortType.DEFAULT;

  constructor(contentContainer, pointsModel) {
    this.#contentContainer = contentContainer;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.TIME:
        return [...this.#pointsModel.points].sort(sortPointTime);
      case SortType.PTICE:
        return [...this.#pointsModel.points].sort(sortPointPrice);
      default:
        return [...this.#pointsModel.points].sort(sortPointUp);
    }
  }

  init = () => {
    this.#renderContent();
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#contentListComponent.element, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointsPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = () => {
    for (let i = 0; i < this.points.length; i++) {
      this.#renderPoint(this.points[i]);
    }
  };

  #renderEmptyContentList = () => {
    render(this.#emptyComponent, this.#contentContainer);
  };

  #renderNewPoint = () => {
    render(this.#newPointComponent, this.#contentListComponent.element);
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#contentContainer, RenderPosition.AFTERBEGIN);
  };

  #renderFilter = () => {
    const siteFilterElement = document.querySelector('.trip-controls__filters');
    const filters = generateFilter(this.points);
    this.#filterComponent = new FilterView(filters);
    render(this.#filterComponent, siteFilterElement);
  };

  #renderTripInfo = () => {
    const siteMainTripElement = document.querySelector('.trip-main');
    const tripInfo = generateTripInfo(this.points);
    this.#tripInfoComponent = new TripInfoView(tripInfo);
    render(this.#tripInfoComponent, siteMainTripElement, RenderPosition.AFTERBEGIN);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearContent();
    this.#renderContent();
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#pointsPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        this.#clearContent();
        this.#renderContent();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this.#clearContent({resetSortType: true});
        this.#renderContent();
        break;
    }
  };

  #handleModeChange = () => {
    this.#pointsPresenter.forEach((presenter) => presenter.resetView());
  };

  #clearContent = ({resetSortType = false} = {}) => {

    this.#pointsPresenter.forEach((presenter) => presenter.destroy());
    this.#pointsPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#emptyComponent);
    remove(this.#tripInfoComponent);
    remove(this.#filterComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };

  #renderContent = () => {
    const points = this.points;
    const pointCount = points.length;
    if (pointCount === 0) {
      this.#renderEmptyContentList();
      return;
    }

    this.#renderSort();

    render(this.#contentListComponent, this.#contentContainer);

    this.#renderTripInfo();
    this.#renderPoints();
    this.#renderNewPoint();
    this.#renderFilter();
  };

}

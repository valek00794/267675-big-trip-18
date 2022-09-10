import { render, RenderPosition } from '../framework/render.js';

import NewPointView from '../view/new-point-view.js';
import ContentListView from '../view/content-list-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import SortView from '../view/sort-view.js';
import TripInfoView from '../view/trip-info-view.js';
import FilterView from '../view/filter-view.js';

import PointPresenter from './point-presenter.js';

import { sortPointUp, sortPointPrice, sortPointTime } from '../utils/point.js';

import { SortType } from '../mock/consts.js';
import { generateTripInfo } from '../mock/trip-info.js';
import { generateFilter } from '../mock/filter.js';


export default class MainPresenter {
  #contentContainer = null;
  #pointsModel = null;

  #contentList = new ContentListView();
  #newPointComponent = new NewPointView();
  #emptyComponent = new ListEmptyView();
  #sortComponent = new SortView();

  #pointsPresenter = new Map();
  #currentSortType = SortType.DEFAULT;

  constructor(contentContainer, pointsModel) {
    this.#contentContainer = contentContainer;
    this.#pointsModel = pointsModel;
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
    const pointPresenter = new PointPresenter(this.#contentList.element, this.#handlePointChange, this.#handleModeChange);
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

  #renderContentList = () => {
    render(this.#contentList, this.#contentContainer);
  };

  #renderNewPoint = () => {
    render(this.#newPointComponent, this.#contentList.element);
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#contentContainer, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderTripInfo = () => {
    const siteMainTripElement = document.querySelector('.trip-main');
    const tripInfo = generateTripInfo(this.points);
    render(new TripInfoView(tripInfo), siteMainTripElement, RenderPosition.AFTERBEGIN);
  };

  #renderFilter = () => {
    const siteFilterElement = document.querySelector('.trip-controls__filters');
    const filters = generateFilter(this.points);
    render(new FilterView(filters), siteFilterElement);
  };

  #clearPointList = () => {
    this.#pointsPresenter.forEach((presenter) => presenter.destroy());
    this.#pointsPresenter.clear();
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearPointList();
    this.#renderPoints();
  };

  #handlePointChange = (updatedPoint) => {

    this.#pointsPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointsPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderContent = () => {
    if (this.points.length) {
      this.#renderContentList();
      this.#renderTripInfo();
      this.#renderSort();
      this.#renderFilter();
      this.#renderPoints();
    }
    else {
      this.#renderEmptyContentList();
    }
    this.#renderNewPoint();
  };

}

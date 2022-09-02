import { render, RenderPosition } from '../framework/render.js';
import NewPointView from '../view/new-point-view.js';
import ContentListView from '../view/content-list-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import SortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/common.js';
import { sortPointUp, sortPointPrice, sortPointTime } from '../utils/point.js';
import { SortType } from '../mock/consts.js';

export default class MainPresenter {
  #contentContainer = null;
  #pointsModel = null;
  #mainPoints = null;

  #contentList = new ContentListView();
  #newPointComponent = new NewPointView();
  #emptyComponent = new ListEmptyView();
  #sortComponent = new SortView();

  #pointsPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourcedMainPoints = [];

  constructor(contentContainer, pointsModel) {
    this.#contentContainer = contentContainer;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#mainPoints = [...this.#pointsModel.points];

    this.#sourcedMainPoints = [...this.#pointsModel.points];
    this.#sortPoints();
    this.#renderPoints();

  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#contentList.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointsPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = () => {
    if (this.#mainPoints.length) {
      for (let i = 0; i < this.#mainPoints.length; i++) {
        this.#renderPoint(this.#mainPoints[i]);
      }
      this.#renderContentList();
      this.#renderNewPoint();
    }
    else {
      this.#renderEmptyContentList();
    }
    this.#renderSort();
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

  #clearPointList = () => {
    this.#pointsPresenter.forEach((presenter) => presenter.destroy());
    this.#pointsPresenter.clear();
  };

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.TIME:
        this.#mainPoints.sort(sortPointTime);
        break;
      case SortType.PTICE:
        this.#mainPoints.sort(sortPointPrice);
        break;
      default:
        this.#mainPoints.sort(sortPointUp);
    }
    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPoints();
  };

  #handlePointChange = (updatedPoint) => {
    this.#mainPoints = updateItem(this.#mainPoints, updatedPoint);
    this.#sourcedMainPoints = updateItem(this.#sourcedMainPoints, updatedPoint);
    this.#pointsPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointsPresenter.forEach((presenter) => presenter.resetView());
  };
}

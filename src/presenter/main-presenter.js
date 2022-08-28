import {render} from '../framework/render.js';
import NewPointView from '../view/new-point-view.js';
import ContentListView from '../view/content-list-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import PointPresenter from './point-presenter.js';

export default class MainPresenter {
  #contentContainer = null;
  #pointsModel = null;
  #mainPoints = null;

  #contentList = new ContentListView();
  #newPointComponent = new NewPointView();
  #emptyComponent = new ListEmptyView();

  init = (contentContainer, pointsModel) => {
    this.#contentContainer = contentContainer;
    this.#pointsModel = pointsModel;
    this.#mainPoints = [...this.#pointsModel.points];

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
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#contentList.element);
    pointPresenter.init(point);
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
}

import { render, RenderPosition } from '../render.js';
import NewPointView from '../view/new-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import ListPointView from '../view/list-point-view.js';
import ContentItemView from '../view/content-item-view.js';


export default class MainPresenter {
  #contentContainer = null;
  #pointsModel = null;
  #mainPoints = null;

  init = (contentContainer, pointsModel) => {
    this.#contentContainer = contentContainer;
    this.#pointsModel = pointsModel;
    this.#mainPoints = [...this.#pointsModel.points];

    const listItemEdit = new ContentItemView();
    render(listItemEdit, this.#contentContainer, RenderPosition.AFTERBEGIN);

    for (let i = 0; i < this.#mainPoints.length; i++) {
      this.#renderPoint(this.#mainPoints[i]);
    }

    const itemListNewPont = new ContentItemView();
    render(itemListNewPont, this.#contentContainer);
    render(new NewPointView(), itemListNewPont.element);
  };

  #renderPoint = (point) => {
    const pointComponent = new ListPointView(point);
    const itemListPonts = new ContentItemView();
    render(itemListPonts, this.#contentContainer);
    render(pointComponent, itemListPonts.element);
  };
}

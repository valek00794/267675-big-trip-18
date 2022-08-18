import { render } from '../render.js';
import NewPointView from '../view/new-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import ListPointView from '../view/list-point-view.js';
import ContentListView from '../view/content-list-view.js';

export default class MainPresenter {
  #contentContainer = null;
  #pointsModel = null;
  #mainPoints = null;
  #contentList = new ContentListView();

  init = (contentContainer, pointsModel) => {
    this.#contentContainer = contentContainer;
    this.#pointsModel = pointsModel;
    this.#mainPoints = [...this.#pointsModel.points];

    for (let i = 0; i < this.#mainPoints.length; i++) {
      this.#renderPoint(this.#mainPoints[i]);
    }

    render(this.#contentList, this.#contentContainer);
    render(new NewPointView(), this.#contentList.element);
  };

  #renderPoint = (point) => {
    const pointComponent = new ListPointView(point);
    const pointEditComponent = new EditPointView(point);

    render(pointComponent, this.#contentList.element);

    const replacePointToForm = () => {
      this.#contentList.element.replaceChild(pointEditComponent.element, pointComponent.element);
    };

    const replaceFormToPoint = () => {
      this.#contentList.element.replaceChild(pointComponent.element, pointEditComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });
  };
}

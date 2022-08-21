import {render, replace} from '../framework/render.js';
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
      replace(pointEditComponent, pointComponent);
    };

    const replaceFormToPoint = () => {
      replace(pointComponent, pointEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setEditClickHandler(() => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setFormSubmitHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setEditClickHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });
  };
}

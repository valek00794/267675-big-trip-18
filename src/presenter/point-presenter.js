import {render, replace} from '../framework/render.js';
import EditPointView from '../view/edit-point-view.js';
import ListPointView from '../view/list-point-view.js';

export default class PointPresenter {
  #contentList = null;
  #point = null;

  constructor(contentList) {
    this.#contentList = contentList;
  }

  init = (point) => {
    this.#point = point;
    const pointComponent = new ListPointView(point);
    const pointEditComponent = new EditPointView(point);

    render(pointComponent, this.#contentList);

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

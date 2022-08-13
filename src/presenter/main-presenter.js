import { render, RenderPosition } from '../render.js';
import NewPointFormView from '../view/new-point-view.js';
import EditPointFormView from '../view/edit-point-view.js';
import ListPointView from '../view/list-point-view.js';
import ContentItemtView from '../view/content-item-view.js';


const MAX_POINT = 3;

export default class MainPresenter {

  init = (contentContainer) => {
    this.contentContainer = contentContainer;

    const listItemEdit = new ContentItemtView();
    render(listItemEdit, this.contentContainer, RenderPosition.AFTERBEGIN);
    render(new EditPointFormView(), listItemEdit.getElement());

    for (let i = 0; i < MAX_POINT; i++) {
      const itemListPonts = new ContentItemtView();
      render(itemListPonts, this.contentContainer);
      render(new ListPointView(), itemListPonts.getElement());
    }

    const itemListNewPont = new ContentItemtView();
    render(itemListNewPont, this.contentContainer);
    render(new NewPointFormView(), itemListNewPont.getElement());
  };

}

import { render, RenderPosition } from '../render.js';
import NewPointView from '../view/new-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import ListPointView from '../view/list-point-view.js';
import ContentItemView from '../view/content-item-view.js';


const MAX_POINT = 3;

export default class MainPresenter {

  init = (contentContainer) => {
    this.contentContainer = contentContainer;

    const listItemEdit = new ContentItemView();
    render(listItemEdit, this.contentContainer, RenderPosition.AFTERBEGIN);
    render(new EditPointView(), listItemEdit.getElement());

    for (let i = 0; i < MAX_POINT; i++) {
      const itemListPonts = new ContentItemView();
      render(itemListPonts, this.contentContainer);
      render(new ListPointView(), itemListPonts.getElement());
    }

    const itemListNewPont = new ContentItemView();
    render(itemListNewPont, this.contentContainer);
    render(new NewPointView(), itemListNewPont.getElement());
  };

}

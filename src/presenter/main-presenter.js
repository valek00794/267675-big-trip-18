import { render, RenderPosition } from '../render.js';
import NewPointView from '../view/new-point-view.js';
import EditPointView from '../view/edit-point-view.js';
import ListPointView from '../view/list-point-view.js';
import ContentItemView from '../view/content-item-view.js';


export default class MainPresenter {

  init = (contentContainer, pointsModel) => {
    this.contentContainer = contentContainer;
    this.pointsModel = pointsModel;
    this.mainPoints = [...this.pointsModel.getPoints()];

    const listItemEdit = new ContentItemView();
    render(listItemEdit, this.contentContainer, RenderPosition.AFTERBEGIN);
    render(new EditPointView(this.mainPoints[0]), listItemEdit.getElement());

    for (let i = 0; i < this.mainPoints.length; i++) {
      const itemListPonts = new ContentItemView();
      render(itemListPonts, this.contentContainer);
      render(new ListPointView(this.mainPoints[i]), itemListPonts.getElement());
    }

    const itemListNewPont = new ContentItemView();
    render(itemListNewPont, this.contentContainer);
    render(new NewPointView(), itemListNewPont.getElement());
  };
}

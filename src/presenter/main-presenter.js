import {render} from '../render.js';
import NewFilterFormView from '../view/filter-view.js';

export default class MainPresenter {
  filterComponent = new NewFilterFormView();

  init = (boardContainer) => {
    this.boardContainer = boardContainer;

    render(this.boardComponent, this.boardContainer);
    render(new SortView(), this.boardComponent.getElement());
  /*  //render(this.taskListComponent, this.boardComponent.getElement());
    //render(new TaskEditView(), this.taskListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new TaskView(), this.taskListComponent.getElement());
    }

    render(new LoadMoreButtonView(), this.boardComponent.getElement());*/
  };
}

import AbstractView from '../framework/view/abstract-view.js';

const createErrorTemplate = () =>`
<p class="trip-events__msg">
Error data loading. Try again later <a href=".">or reload page</a>
</p>`;

export default class ListErrorView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return createErrorTemplate();
  }
}

import {createElement} from '../render.js';

const contentListTemplate = () => `<ul class="trip-events__list">
</ul>`;

export default class ContentListView {
  getTemplate() {
    return contentListTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

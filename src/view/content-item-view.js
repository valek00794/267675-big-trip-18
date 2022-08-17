import {createElement} from '../render.js';

const contentItemTemplate = () => `<li class="trip-events__item">
</li>`;

export default class ContentItemView {
  getTemplate() {
    return contentItemTemplate();
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

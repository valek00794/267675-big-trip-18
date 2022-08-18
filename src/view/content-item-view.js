import {createElement} from '../render.js';

const contentItemTemplate = () => `<li class="trip-events__item">
</li>`;

export default class ContentItemView {
  #element = null;
  get template() {
    return contentItemTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}

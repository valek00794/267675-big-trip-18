import {createElement} from '../render.js';

const contentListTemplate = () => `<ul class="trip-events__list">
</ul>`;

export default class ContentListView {
  #element = null;

  get template() {
    return contentListTemplate();
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

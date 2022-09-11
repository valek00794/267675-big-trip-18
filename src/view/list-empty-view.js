import AbstractView from '../framework/view/abstract-view.js';

import { FilterType } from '../mock/consts.js';

const EmptyListTextType = {
  [FilterType.ALL]: 'Click "NEW EVENT" in menu to create your first waypoint',
  [FilterType.FUTURE]: 'There are no future waypoints now',
  [FilterType.PAST]: 'There are no past waypoints now',
};

const createEmptyTemplate = (filterType) => {
  const enptyListTextValue = EmptyListTextType[filterType];
  return (
    `<p class="trip-events__msg">
     ${enptyListTextValue}
    </p>
   `);
};

export default class ListEmptyView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyTemplate(this.#filterType);
  }
}

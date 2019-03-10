import { createStore } from '../../redux';
import { restoreTodos } from '../../redux/actions';

class Subscribers {
  subs = []
  add(sub) {
    this.subs.push(sub);
    return true;
  }
  remove(sub) {
    const index = this.subs.indexOf(sub);
    if (index < 0) {
      return false;
    }
    this.subs.splice(index, 1);

    return true;
  }
  [Symbol.iterator]() {
    return this.subs.values()
  }
}
export const subscribers = new Subscribers();

export const store = createStore();

store.subscribe(() => {
  for (const subscriber of subscribers) {
    subscriber.postMessage(store.getState());
  }
});
store.dispatch(restoreTodos());

/* globals self, clients, serviceWorkerOption */
/* eslint no-restricted-globals: 1 */
import { store, subscribers } from './lib/state';
import * as debug from '../debug';

self.addEventListener('message', (event) => {
  debug.sw.message(event);

  const { ports, data } = event;

  const { type } = data;

  if (type === 'action') {
    const { action } = data;

    const result = store.dispatch(action);

    for (const port of ports) {
      port.postMessage(result);
    }

    return;
  }

  if (type === 'subscribe') {
    for (const port of ports) {
      subscribers.add(port);
      port.postMessage(store.getState());
    }

    return;
  }

  if (type === 'unsubscribe') {
    for (let port of ports) {
      subscribers.remove(port);
    }
  }
});

self.addEventListener('install', (event) => {
  self.skipWaiting();
})

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

/* globals self, serviceWorkerOption */
/* eslint no-restricted-globals: 1 */
import Pattern from 'url-pattern';
import * as moment from 'moment';
import { createDatabase } from './database';
import * as debug from './debug';

console.log(serviceWorkerOption);

const delay = (ms) => new Promise((resolve) => {
  setTimeout(
    () => resolve(),
    ms
  );
});

const todosApi = createDatabase(['todos'])('todos');
const todoPattern = new Pattern('/todos/:id');

self.addEventListener('install', debug.sw.install);
self.addEventListener('activate', debug.sw.activate);
self.addEventListener('message', debug.sw.message);
self.addEventListener('fetch', debug.sw.fetch);
self.addEventListener('sync', (event) => {
  debug.sw.sync(event);
  const matchTodo = todoPattern.match(event.tag);
  if (matchTodo) {
      event.waitUntil(
        todosApi.get(matchTodo.id)
          .then(todo => {
            const delayMs = moment.duration(moment(todo.alertAt) - moment()).asMilliseconds();
            if (delayMs < 0) {
              throw new Error(`Delay invalid ${todo.alertAt}: ${todo.message}`);
            }
            return delay(delayMs).then(
              () => todo
            );
          })
          .then(todo => self.registration.showNotification(todo.message, {
            body: todo.message,
            actions: [{
              action: 'complete', title: 'complete'
            }, {
              action: 'delete', title: 'delete'
            }],
            data: todo,
            badge: 'http://localhost:3000/favicon.ico',
            icon: 'http://localhost:3000/favicon.ico',
            requireInteraction: true,
            vibrate: [300, 100, 400],
          }))
      );
  }
});
self.addEventListener('notificationclick', (event) => {
  debug.sw.notification(event);


});

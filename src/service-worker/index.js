/* globals self, serviceWorkerOption */
/* eslint no-restricted-globals: 1 */
import server from './browser-server';
import * as debug from '../debug';

self.addEventListener('install', function(event) {
  event.waitUntil(self.skipWaiting()); // Activate worker immediately
});
self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim()); // Become available to all pages
});
self.addEventListener('message', async (event) => {
  debug.sw.message(event);
  const result = await server.handle(event);
  event.ports[0].postMessage(result);
});
// self.addEventListener('fetch', console.log);
// self.addEventListener('sync', console.log);

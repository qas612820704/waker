import debug from 'debug';

if (process.env.NODE_ENV === 'development') {
  debug.enable('waker:*');
}

export const sw = {
  install: debug('waker:sw:install'),
  activate: debug('waker:sw:activate'),
  message: debug('waker:sw:message'),
  fetch: debug('waker:sw:fetch'),
  sync: debug('waker:sw:sync'),
  notification: debug('waker:sw:notification'),
};

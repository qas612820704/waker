import debug from 'debug';

if (process.env.NODE_ENV === 'development') {
  debug.enable('waker:*');
}

export const api = debug('waker:api');
export const sw = {
  message: debug('waker:service-worker:message'),
  app: debug('waker:service-worker:app'),
};

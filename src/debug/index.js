import debug from 'debug';

if (process.env.NODE_ENV === 'development') {
  debug.enable('waker:*');
}

export const sw = {
  message: debug('waker:sw:message'),
};

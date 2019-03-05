import * as debug from '../../debug';

export function createApi() {
  return ['get', 'post', 'put', 'delete'].reduce((methods, method) => {
    return {
      [method]: createMethod(method, handler),
      ...methods,
    }
  }, {});
}

function createMethod(method, handler) {
  return (uri, payload) => handler({
    method,
    uri,
    payload,
  });
}


function handler(data) {
  debug.api(data);

  const channel = new MessageChannel();
  return new Promise((resolve) => {
    channel.port1.onmessage = (event) => {
      resolve(event.data);
    }

    navigator.serviceWorker.controller.postMessage(data, [channel.port2]);
  });
}

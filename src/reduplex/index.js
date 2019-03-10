import { useState, useEffect } from 'react';
import reducer from '../redux/reducer';

const defaultState = reducer(undefined, { type: '@@INIT' });

export function useMappedState(mapState) {
  const [ state, setState ] = useState(mapState(defaultState));

  useEffect(
    () => {
      const channel = new MessageChannel();

      channel.port1.onmessage = (({ data }) => {
        setState(mapState(data));
      });

      navigator.serviceWorker.controller.postMessage(
        { type: 'subscribe' },
        [ channel.port2 ],
      );

      return () => {
        navigator.serviceWorker.controller.postMessage(
          { type: 'unsubscribe' },
          [ channel.port2 ],
        );
      }
    },
    []
  );

  return state;
}

export function useDispatch() {
  return function dispatch(action) {
    const channel = new MessageChannel();
    navigator.serviceWorker.controller.postMessage(
      { type: 'action', action },
      [ channel.port2 ],
    );
  }
}
